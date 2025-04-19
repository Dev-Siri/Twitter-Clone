package user_controllers

import (
	"database/sql"
	"twitter/db"
	"twitter/logging"
	"twitter/models/responses"

	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

func GetBannerPicture(ctx *fasthttp.RequestCtx) {
	tag := ctx.UserValue("tag").(string)

	row := db.Database.QueryRow(`
		SELECT banner FROM "Users"
		WHERE tag = $1
	`, tag)

	var banner string

	if err := row.Scan(&banner); err != nil {
		if err == sql.ErrNoRows {
			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusNotFound,
				Message: "Banner not found",
			})

			go logging.Logger.Error("Banner not found for tag", zap.String("tag", tag))

			ctx.SetStatusCode(fasthttp.StatusNotFound)
			ctx.Write(response)
			return
		}

		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to get banner",
		})

		go logging.Logger.Error("Failed to get banner for tag", zap.Error(err), zap.String("tag", tag))

		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	response := responses.CreateSuccessResponse[string](&responses.Success[string]{
		Status: fasthttp.StatusOK,
		Data:   banner,
	})

	ctx.SetStatusCode(fasthttp.StatusOK)
	ctx.Write(response)
}
