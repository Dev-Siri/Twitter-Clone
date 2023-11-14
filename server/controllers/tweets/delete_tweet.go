package tweet_controllers

import (
	"twitter/db"
	"twitter/logging"
	"twitter/models/responses"

	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

func DeleteTweet(ctx *fasthttp.RequestCtx) {
	tweetId := ctx.UserValue("id").(string)

	_, err := db.Database.Exec(`
		DELETE FROM "Tweets"
		WHERE tweet_id = $1
	`, tweetId)

	if err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to delete tweet",
		})

		go logging.Logger.Error("Failed to delete tweet", zap.Error(err))
		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	response := responses.CreateSuccessResponse[string](&responses.Success[string]{
		Status: fasthttp.StatusOK,
		Data:   "Tweet deleted successfully",
	})

	ctx.SetStatusCode(fasthttp.StatusOK)
	ctx.Write(response)
}
