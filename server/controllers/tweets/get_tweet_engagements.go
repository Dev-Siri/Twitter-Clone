package tweet_controllers

import (
	"twitter/db"
	"twitter/logging"
	"twitter/models"
	"twitter/models/responses"

	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

func GetTweetEngagements(ctx *fasthttp.RequestCtx) {
	tweetId := ctx.UserValue("id").(string)

	errorChannel := make(chan error)
	likeCountChannel := make(chan int)
	replyCountChannel := make(chan int)

	go func() {
		row := db.Database.QueryRow(`
			SELECT COUNT(*) FROM "Likes"
			WHERE tweet_id = $1
		`, tweetId)

		var likeCount int

		if err := row.Scan(&likeCount); err != nil {
			go logging.Logger.Error("Failed to load like count", zap.Error(err))

			errorChannel <- err
		}

		likeCountChannel <- likeCount
	}()

	go func() {
		row := db.Database.QueryRow(`
			SELECT COUNT(*) FROM "Tweets"
			WHERE in_reply_to_tweet_id = $1
		`, tweetId)

		var likeCount int

		if err := row.Scan(&likeCount); err != nil {
			go logging.Logger.Error("Failed to load reply count", zap.Error(err))

			errorChannel <- err
		}

		replyCountChannel <- likeCount
	}()

	select {
	case err := <-errorChannel:
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: err.Error(),
		})

		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
	default:
		likeCount := <-likeCountChannel
		replyCount := <-replyCountChannel

		response := responses.CreateSuccessResponse[models.Engagement](&responses.Success[models.Engagement]{
			Status: fasthttp.StatusOK,
			Data: models.Engagement{
				Likes:   likeCount,
				Replies: replyCount,
			},
		})

		ctx.SetStatusCode(fasthttp.StatusOK)
		ctx.Write(response)
	}
}
