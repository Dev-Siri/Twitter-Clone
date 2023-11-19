package tweet_controllers

import (
	"database/sql"
	"twitter/db"
	"twitter/logging"
	"twitter/models/responses"

	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

func IsTweetAlreadyRetweeted(ctx *fasthttp.RequestCtx) {
	tweetId := ctx.UserValue("id")
	userId := string(ctx.QueryArgs().Peek("userId"))

	row := db.Database.QueryRow(`
		SELECT COUNT(*) FROM "Tweets"
		WHERE caption LIKE 'https://twitter-revived.vercel.app/%/status/' || $1
		AND user_id = $2
	`, tweetId, userId)

	var numberOfTimesRetweeted int

	if err := row.Scan(&numberOfTimesRetweeted); err != nil {
		if err == sql.ErrNoRows {
			numberOfTimesRetweeted = 0
		} else {
			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusInternalServerError,
				Message: "Failed to get whether the tweet is already retweeted",
			})

			logging.Logger.Error("Failed to get whether the tweet is already retweeted", zap.Error(err))
			ctx.SetStatusCode(fasthttp.StatusInternalServerError)
			ctx.Write(response)
			return
		}
	}

	response := responses.CreateSuccessResponse[bool](&responses.Success[bool]{
		Status: fasthttp.StatusOK,
		Data:   numberOfTimesRetweeted > 0,
	})

	ctx.SetStatusCode(fasthttp.StatusOK)
	ctx.Write(response)
}
