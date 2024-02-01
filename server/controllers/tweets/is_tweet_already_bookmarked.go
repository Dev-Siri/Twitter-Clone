package tweet_controllers

import (
	"database/sql"
	"twitter/db"
	"twitter/logging"
	"twitter/models/responses"

	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

func IsTweetAlreadyBookmarked(ctx *fasthttp.RequestCtx) {
	tweetId := ctx.UserValue("id").(string)
	tag := string(ctx.QueryArgs().Peek("tag"))

	row := db.Database.QueryRow(`
		SELECT COUNT(*) FROM "Bookmarks"
		WHERE tweet_id = $1 AND tag = $2;
	`, tweetId, tag)

	var numberOfTimesBookmarked int

	if err := row.Scan(&numberOfTimesBookmarked); err != nil {
		if err == sql.ErrNoRows {
			numberOfTimesBookmarked = 0
		} else {
			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusInternalServerError,
				Message: "Failed to get whether the Tweet is already bookmarked",
			})

			logging.Logger.Error("Failed to get whether the Tweet is already bookmarked", zap.Error(err))
			ctx.SetStatusCode(fasthttp.StatusInternalServerError)
			ctx.Write(response)
			return
		}
	}

	response := responses.CreateSuccessResponse[bool](&responses.Success[bool]{
		Status: fasthttp.StatusOK,
		Data:   numberOfTimesBookmarked > 0,
	})

	ctx.SetStatusCode(fasthttp.StatusOK)
	ctx.Write(response)
}
