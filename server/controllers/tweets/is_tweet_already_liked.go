package tweet_controllers

import (
	"database/sql"
	"twitter/db"
	"twitter/logging"
	"twitter/models/responses"

	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

func IsTweetAlreadyLiked(ctx *fasthttp.RequestCtx) {
	tweetId := ctx.UserValue("id")
	userId := string(ctx.QueryArgs().Peek("userId"))

	row := db.Database.QueryRow(`
		SELECT COUNT(*) FROM "Likes"
		WHERE tweet_id = $1 AND user_id = $2
	`, tweetId, userId)

	var numberOfTimesLiked int

	if err := row.Scan(&numberOfTimesLiked); err != nil {
		if err == sql.ErrNoRows {
			numberOfTimesLiked = 0
		} else {
			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusInternalServerError,
				Message: "Failed to get whether the tweet is already liked",
			})

			logging.Logger.Error("Failed to get whether the tweet is already liked", zap.Error(err))
			ctx.SetStatusCode(fasthttp.StatusInternalServerError)
			ctx.Write(response)
			return
		}
	}

	response := responses.CreateSuccessResponse[bool](&responses.Success[bool]{
		Status: fasthttp.StatusOK,
		Data:   numberOfTimesLiked > 0,
	})

	ctx.SetStatusCode(fasthttp.StatusOK)
	ctx.Write(response)
}
