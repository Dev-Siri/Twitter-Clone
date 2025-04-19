package tweet_controllers

import (
	"database/sql"
	"twitter/db"
	"twitter/models/responses"

	"github.com/valyala/fasthttp"
)

func GetTweetCountByUser(ctx *fasthttp.RequestCtx) {
	userId := string(ctx.QueryArgs().Peek("userId"))

	row := db.Database.QueryRow(`
		SELECT COUNT(*) FROM "Tweets"
		WHERE user_id = $1	
	`, userId)

	var tweetCount int

	if err := row.Scan(&tweetCount); err != nil {
		if err == sql.ErrNoRows {
			tweetCount = 0
		} else {
			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusInternalServerError,
				Message: "Failed to get tweet count",
			})

			ctx.SetStatusCode(fasthttp.StatusInternalServerError)
			ctx.Write(response)
			return
		}
	}

	response := responses.CreateSuccessResponse[int](&responses.Success[int]{
		Status: fasthttp.StatusOK,
		Data:   tweetCount,
	})

	ctx.SetStatusCode(fasthttp.StatusOK)
	ctx.Write(response)
}
