package user_controllers

import (
	"twitter/db"
	"twitter/logging"
	"twitter/models/responses"

	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

func GetUserFollowerCount(ctx *fasthttp.RequestCtx) {
	tag := ctx.UserValue("tag").(string)

	row := db.Database.QueryRow(`
		SELECT COUNT(*) FROM "Followers"
		WHERE following = $1;
	`, tag)

	var followerCount int

	if err := row.Scan(&followerCount); err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to get follower count",
		})

		go logging.Logger.Error("Failed to get follower count", zap.Error(err))

		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	response := responses.CreateSuccessResponse[int](&responses.Success[int]{
		Status: fasthttp.StatusOK,
		Data:   followerCount,
	})

	ctx.SetStatusCode(fasthttp.StatusOK)
	ctx.Write(response)
}
