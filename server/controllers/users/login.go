package user_controllers

import (
	"database/sql"
	"encoding/json"
	"twitter/db"
	"twitter/logging"
	"twitter/models"
	"twitter/models/responses"
	"twitter/utils"

	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
	"golang.org/x/crypto/bcrypt"
)

func Login(ctx *fasthttp.RequestCtx) {
	var body models.User

	if err := json.Unmarshal(ctx.Request.Body(), &body); err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to decode your info",
		})

		go logging.Logger.Error("Failed to deserialize body", zap.Error(err))
		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	if !utils.IsEmailValid(body.Email) {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusBadRequest,
			Message: "Invalid email",
		})

		go logging.Logger.Error("Invalid email")
		ctx.SetStatusCode(fasthttp.StatusBadRequest)
		ctx.Write(response)
		return
	}

	if body.Password == "" {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusBadRequest,
			Message: "Password is required",
		})

		go logging.Logger.Error("Password is required")
		ctx.SetStatusCode(fasthttp.StatusBadRequest)
		ctx.Write(response)
		return
	}

	if len(body.Password) <= 8 {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusBadRequest,
			Message: "Password is above 8 characters",
		})

		go logging.Logger.Error("Password is above 8 characters")
		ctx.SetStatusCode(fasthttp.StatusBadRequest)
		ctx.Write(response)
		return
	}

	row := db.Database.QueryRow(`
		SELECT
			user_id,
			name,
			user_image,
			birthday,
			tag,
			password
		FROM "Users"
		WHERE email = $1
	`, body.Email)

	var dbUser models.User

	if err := row.Scan(
		&dbUser.UserId,
		&dbUser.Name,
		&dbUser.UserImage,
		&dbUser.Birthday,
		&dbUser.Tag,
		&dbUser.Password,
	); err != nil {
		if err == sql.ErrNoRows {
			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusNotFound,
				Message: "Account doesn't exist",
			})

			go logging.Logger.Error("Account doesn't exist", zap.Error(err))
			ctx.SetStatusCode(fasthttp.StatusNotFound)
			ctx.Write(response)
			return
		}

		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to login with your info",
		})

		go logging.Logger.Error("Failed to login with your info", zap.Error(err))
		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(dbUser.Password), []byte(body.Password)); err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusBadRequest,
			Message: "Password is incorrect",
		})

		go logging.Logger.Error("Password is incorrect", zap.Error(err))
		ctx.SetStatusCode(fasthttp.StatusBadRequest)
		ctx.Write(response)
		return
	}

	token, err := utils.CreateUserJWTResponse(dbUser.UserId, dbUser.Name, dbUser.UserImage, dbUser.Email, dbUser.Tag, dbUser.Birthday)

	if err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to sign a token for your account",
		})

		go logging.Logger.Error("Failed to sign a token for your account", zap.Error(err))
		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	response := responses.CreateSuccessResponse[string](&responses.Success[string]{
		Status: fasthttp.StatusOK,
		Data:   token,
	})

	ctx.SetStatusCode(fasthttp.StatusOK)
	ctx.Write(response)
}
