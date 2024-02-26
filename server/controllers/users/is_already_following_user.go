package user_controllers

import (
	"database/sql"
	"twitter/db"
	"twitter/logging"
	"twitter/models/responses"

	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

func IsAlreadyFollowingUser(ctx *fasthttp.RequestCtx) {
	followingTag := ctx.UserValue("tag").(string)
	followerTag := string(ctx.QueryArgs().Peek("follower"))

	row := db.Database.QueryRow(`
	SELECT COUNT(*) FROM "Followers"
	WHERE follower = $1 AND following = $2
`, followerTag, followingTag)

	var numberOfTimesFollowed int

	if err := row.Scan(&numberOfTimesFollowed); err != nil {
		if err == sql.ErrNoRows {
			numberOfTimesFollowed = 0
		} else {
			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusInternalServerError,
				Message: "Failed to get whether the user is already followed",
			})

			logging.Logger.Error("Failed to get whether the user is already followed", zap.Error(err))
			ctx.SetStatusCode(fasthttp.StatusInternalServerError)
			ctx.Write(response)
			return
		}
	}

	response := responses.CreateSuccessResponse[bool](&responses.Success[bool]{
		Status: fasthttp.StatusOK,
		Data:   numberOfTimesFollowed > 0,
	})

	ctx.SetStatusCode(fasthttp.StatusOK)
	ctx.Write(response)

}
