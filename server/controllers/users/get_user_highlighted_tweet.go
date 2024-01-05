package user_controllers

import (
	"database/sql"
	"twitter/db"
	"twitter/logging"
	"twitter/models"
	"twitter/models/responses"

	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

func GetUserHighlightedTweet(ctx *fasthttp.RequestCtx) {
	tag := ctx.UserValue("tag").(string)

	highlightedTweetIdRow := db.Database.QueryRow(`
		SELECT highlighted_tweet_id FROM "Users"
		WHERE tag = $1
	`, tag)

	var highlightedTweetId string

	if err := highlightedTweetIdRow.Scan(&highlightedTweetId); err != nil {
		if err == sql.ErrNoRows {
			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusNotFound,
				Message: "User doesn't exist or has no highlighted tweet",
			})

			go logging.Logger.Error("User doesn't exist or has no highlighted tweet", zap.String("tag", tag), zap.Error(err))

			ctx.SetStatusCode(fasthttp.StatusNotFound)
			ctx.Write(response)
			return
		}

		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to get highlighted tweet id",
		})

		go logging.Logger.Error("Failed to get highlighted tweet id", zap.String("tag", tag), zap.Error(err))

		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	highlightedTweetRow := db.Database.QueryRow(`
		SELECT
			t.caption,
			t.created_at,
			t.media,
			t.tweet_id,
			t.user_id,
			u.name,
			u.user_image,
			u.tag
		FROM "Tweets" t
		INNER JOIN "Users" u
		ON t.user_id = u.user_id
		WHERE t.tweet_id = $1;
	`, highlightedTweetId)

	var highlightedTweet models.Tweet
	var media sql.NullString

	if err := highlightedTweetRow.Scan(
		&highlightedTweet.Caption,
		&highlightedTweet.CreatedAt,
		&media,
		&highlightedTweet.TweetId,
		&highlightedTweet.UserId,
		&highlightedTweet.Name,
		&highlightedTweet.UserImage,
		&highlightedTweet.Tag,
	); err != nil {
		if err == sql.ErrNoRows {
			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusNotFound,
				Message: "User doesn't have a highlighted tweet",
			})

			go logging.Logger.Error("User doesn't have a highlighted tweet", zap.String("tag", tag), zap.Error(err))

			ctx.SetStatusCode(fasthttp.StatusNotFound)
			ctx.Write(response)
			return
		}

		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to get highlighted tweet",
		})

		go logging.Logger.Error("Failed to get highlighted tweet", zap.String("tag", tag), zap.Error(err))

		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	if media.Valid {
		highlightedTweet.Media = media.String
	}

	response := responses.CreateSuccessResponse[models.Tweet](&responses.Success[models.Tweet]{
		Status: fasthttp.StatusOK,
		Data:   highlightedTweet,
	})

	ctx.SetStatusCode(fasthttp.StatusOK)
	ctx.Write(response)
}
