package user_controllers

import (
	"database/sql"
	"encoding/json"
	"twitter/db"
	"twitter/logging"
	"twitter/models"
	"twitter/models/responses"
	"twitter/utils"

	"github.com/google/uuid"
	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

func UpdateUserProfile(ctx *fasthttp.RequestCtx) {
	tag := ctx.UserValue("tag").(string)

	var body models.User

	if err := json.Unmarshal(ctx.Request.Body(), &body); err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to decode your updated profile",
		})

		go logging.Logger.Error("Failed to deserialize body", zap.Error(err))
		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	if body.Name == "" {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusBadRequest,
			Message: "Name is required",
		})

		go logging.Logger.Error("Name is required")
		ctx.SetStatusCode(fasthttp.StatusBadRequest)
		ctx.Write(response)
		return
	}

	var bannerUrl string
	var userImageUrl string

	if body.Banner != "" {
		uploadedBannerUrl, err := db.UploadDataURL(body.Banner, "users/"+uuid.NewString())

		if err != nil {
			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusInternalServerError,
				Message: "Failed to upload your banner",
			})

			go logging.Logger.Error("Failed to upload banner", zap.Error(err))
			ctx.SetStatusCode(fasthttp.StatusInternalServerError)
			ctx.Write(response)
			return
		}

		bannerUrl = uploadedBannerUrl
	}

	if body.UserImage != "" {
		uploadedUserImageUrl, err := db.UploadDataURL(body.UserImage, "users/"+uuid.NewString())

		if err != nil {
			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusInternalServerError,
				Message: "Failed to upload your profile picture",
			})

			go logging.Logger.Error("Failed to upload profile picture", zap.Error(err))
			ctx.SetStatusCode(fasthttp.StatusInternalServerError)
			ctx.Write(response)
			return
		}

		userImageUrl = uploadedUserImageUrl
	}

	_, err := db.Database.Exec(`
		UPDATE "Users"
		SET name = $1,
			bio = $2,
			location = $3,
			website = $4,
			banner = $5,
			user_image = COALESCE($6, user_image)
		WHERE tag = $7;
	`, body.Name,
		utils.NewNullableString(body.Bio),
		utils.NewNullableString(body.Location),
		utils.NewNullableString(body.Website),
		utils.NewNullableString(bannerUrl),
		utils.NewNullableString(userImageUrl),
		tag)

	if err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to update your profile",
		})

		go logging.Logger.Error("Failed to update your profile", zap.Error(err))
		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	row := db.Database.QueryRow(`
	SELECT
		user_id,
		email,
		name,
		user_image,
		tag,
		birthday
	FROM "Users"
	WHERE tag = $1
`, tag)

	var user models.User

	if err := row.Scan(
		&user.UserId,
		&user.Email,
		&user.Name,
		&user.UserImage,
		&user.Tag,
		&user.Birthday,
	); err != nil {
		if err == sql.ErrNoRows {
			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusNotFound,
				Message: "User doesn't exist",
			})

			go logging.Logger.Error("User doesn't exist", zap.String("tag", tag), zap.Error(err))

			ctx.SetStatusCode(fasthttp.StatusNotFound)
			ctx.Write(response)
			return
		}

		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to load user",
		})

		go logging.Logger.Error("Failed to load user", zap.Error(err))

		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	updatedJwtToken, err := utils.CreateUserJWTResponse(user.UserId, user.Name, user.UserImage, user.Email, user.Tag, user.Birthday)

	if err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to sign your new updated token",
		})

		go logging.Logger.Error("Failed to sign new updated token", zap.Error(err))

		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	response := responses.CreateSuccessResponse[string](&responses.Success[string]{
		Status: fasthttp.StatusOK,
		Data:   updatedJwtToken,
	})

	ctx.SetStatusCode(fasthttp.StatusCreated)
	ctx.Write(response)
}
