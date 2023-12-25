package tweet_controllers

import (
	"twitter/db"
	"twitter/logging"
	"twitter/models/responses"

	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

func HighlightTweet(ctx *fasthttp.RequestCtx) {
	userId := string(ctx.QueryArgs().Peek("userId"))
	tweetId := ctx.UserValue("id")

	_, err := db.Database.Exec(`
		UPDATE "Users"
		SET highlighted_tweet_id = $1
		WHERE user_id = $2;
	`, tweetId, userId)

	if err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to highlight tweet",
		})

		go logging.Logger.Error("Failed to highlight tweet", zap.Error(err))

		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	response := responses.CreateSuccessResponse[string](&responses.Success[string]{
		Status: fasthttp.StatusOK,
		Data:   "Tweet highlighted successfully",
	})

	ctx.SetStatusCode(fasthttp.StatusOK)
	ctx.Write(response)
}
