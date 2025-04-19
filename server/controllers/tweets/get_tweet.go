package tweet_controllers

import (
	"database/sql"
	"twitter/db"
	"twitter/logging"
	"twitter/models"
	"twitter/models/responses"

	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

func GetTweet(ctx *fasthttp.RequestCtx) {
	tweetId := ctx.UserValue("id").(string)

	row := db.Database.QueryRow(`
		SELECT
			t.caption,
			t.created_at,
			t.media,
			t.tweet_id,
			t.user_id,
			t.platform,
			t.in_reply_to_tweet_id,
			u.name,
			u.user_image,
			u.tag
		FROM "Tweets" t
		INNER JOIN "Users" u
		ON t.user_id = u.user_id
		WHERE t.tweet_id = $1
	`, tweetId)

	var tweet models.Tweet
	var media sql.NullString
	var responseToTweetId sql.NullString

	if err := row.Scan(
		&tweet.Caption,
		&tweet.CreatedAt,
		&media,
		&tweet.TweetId,
		&tweet.UserId,
		&tweet.Platform,
		&responseToTweetId,
		&tweet.Name,
		&tweet.UserImage,
		&tweet.Tag,
	); err != nil {
		if err == sql.ErrNoRows {
			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusNotFound,
				Message: "Tweet doesn't exist",
			})

			go logging.Logger.Error("Tweet doesn't exist", zap.Error(err))
			ctx.SetStatusCode(fasthttp.StatusNotFound)
			ctx.Write(response)
			return
		}

		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to load Tweet",
		})

		go logging.Logger.Error("Failed to load Tweet", zap.Error(err))
		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	if media.Valid {
		tweet.Media = media.String
	}

	if responseToTweetId.Valid {
		tweet.InReplyToTweetId = responseToTweetId.String
	}

	response := responses.CreateSuccessResponse[models.Tweet](&responses.Success[models.Tweet]{
		Status: fasthttp.StatusOK,
		Data:   tweet,
	})

	ctx.SetStatusCode(fasthttp.StatusOK)
	ctx.Write(response)
}
