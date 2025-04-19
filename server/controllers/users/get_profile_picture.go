package user_controllers

import (
	"database/sql"
	"twitter/db"
	"twitter/logging"
	"twitter/models/responses"

	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

func GetProfilePicture(ctx *fasthttp.RequestCtx) {
	tag := ctx.UserValue("tag").(string)

	row := db.Database.QueryRow(`
		SELECT user_image FROM "Users"
		WHERE tag = $1
	`, tag)

	var userImage string

	if err := row.Scan(&userImage); err != nil {
		if err == sql.ErrNoRows {
			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusNotFound,
				Message: "Profile picture not found",
			})

			go logging.Logger.Error("Profile picture not found for tag", zap.String("tag", tag))

			ctx.SetStatusCode(fasthttp.StatusNotFound)
			ctx.Write(response)
			return
		}

		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to get profile picture",
		})

		go logging.Logger.Error("Failed to get profile picture for tag", zap.Error(err), zap.String("tag", tag))

		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	response := responses.CreateSuccessResponse[string](&responses.Success[string]{
		Status: fasthttp.StatusOK,
		Data:   userImage,
	})

	ctx.SetStatusCode(fasthttp.StatusOK)
	ctx.Write(response)
}
