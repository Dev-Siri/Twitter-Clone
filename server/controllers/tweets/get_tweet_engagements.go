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
	retweetCountChannel := make(chan int)
	quoteTweetCountChannel := make(chan int)
	bookmarkCountChannel := make(chan int)

	go func() {
		row := db.Database.QueryRow(`
			SELECT COUNT(*) FROM "Likes"
			WHERE tweet_id = $1;
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
			WHERE in_reply_to_tweet_id = $1;
		`, tweetId)

		var likeCount int

		if err := row.Scan(&likeCount); err != nil {
			go logging.Logger.Error("Failed to load reply count", zap.Error(err))

			errorChannel <- err
		}

		replyCountChannel <- likeCount
	}()

	go func() {
		row := db.Database.QueryRow(`
			SELECT COUNT(*) FROM "Tweets"
			WHERE caption LIKE 'https://twitter-revived.vercel.app/%/status/' || $1;
		`, tweetId)

		var retweetCount int

		if err := row.Scan(&retweetCount); err != nil {
			go logging.Logger.Error("Failed to load retweet count", zap.Error(err))

			errorChannel <- err
		}

		retweetCountChannel <- retweetCount
	}()

	go func() {
		row := db.Database.QueryRow(`
			SELECT COUNT(*) FROM "Tweets"
			WHERE caption LIKE '%https://twitter-revived.vercel.app/%/status/' || $1
			AND caption NOT LIKE 'https://twitter-revived.vercel.app/%/status/' || $1;
		`, tweetId)

		var quoteTweetCount int

		if err := row.Scan(&quoteTweetCount); err != nil {
			go logging.Logger.Error("Failed to load quote tweet count", zap.Error(err))

			errorChannel <- err
		}

		quoteTweetCountChannel <- quoteTweetCount
	}()

	go func() {
		row := db.Database.QueryRow(`
			SELECT COUNT(*) FROM "Bookmarks"
			WHERE tweet_id = $1;
		`, tweetId)

		var bookmarkCount int

		if err := row.Scan(&bookmarkCount); err != nil {
			go logging.Logger.Error("Failed to load bookmark count", zap.Error(err))

			errorChannel <- err
		}

		bookmarkCountChannel <- bookmarkCount
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
		retweetCount := <-retweetCountChannel
		quoteTweetCount := <-quoteTweetCountChannel
		bookmarkCount := <-bookmarkCountChannel

		response := responses.CreateSuccessResponse[models.Engagement](&responses.Success[models.Engagement]{
			Status: fasthttp.StatusOK,
			Data: models.Engagement{
				Likes:       likeCount,
				Replies:     replyCount,
				Retweets:    retweetCount,
				QuoteTweets: quoteTweetCount,
				Bookmarks:   bookmarkCount,
			},
		})

		ctx.SetStatusCode(fasthttp.StatusOK)
		ctx.Write(response)
	}
}
