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

func GetUserPinnedTweet(ctx *fasthttp.RequestCtx) {
	tag := ctx.UserValue("tag").(string)

	pinnedTweetIdRow := db.Database.QueryRow(`
		SELECT pinned_tweet_id FROM "Users"
		WHERE tag = $1
	`, tag)

	var pinnedTweetId string

	if err := pinnedTweetIdRow.Scan(&pinnedTweetId); err != nil {
		if err == sql.ErrNoRows {
			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusNotFound,
				Message: "User doesn't exist or has no pinned tweet",
			})

			go logging.Logger.Error("User doesn't exist or has no pinned tweet", zap.String("tag", tag), zap.Error(err))

			ctx.SetStatusCode(fasthttp.StatusNotFound)
			ctx.Write(response)
			return
		}

		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to get pinned tweet id",
		})

		go logging.Logger.Error("Failed to get pinned tweet id", zap.String("tag", tag), zap.Error(err))

		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	pinnedTweetRow := db.Database.QueryRow(`
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
	`, pinnedTweetId)

	var pinnedTweet models.Tweet
	var media sql.NullString

	if err := pinnedTweetRow.Scan(
		&pinnedTweet.Caption,
		&pinnedTweet.CreatedAt,
		&media,
		&pinnedTweet.TweetId,
		&pinnedTweet.UserId,
		&pinnedTweet.Name,
		&pinnedTweet.UserImage,
		&pinnedTweet.Tag,
	); err != nil {
		if err == sql.ErrNoRows {
			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusNotFound,
				Message: "User doesn't have a pinned tweet",
			})

			go logging.Logger.Error("User doesn't have a pinned tweet", zap.String("tag", tag), zap.Error(err))

			ctx.SetStatusCode(fasthttp.StatusNotFound)
			ctx.Write(response)
			return
		}

		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to get pinned tweet",
		})

		go logging.Logger.Error("Failed to get pinned tweet", zap.String("tag", tag), zap.Error(err))

		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	if media.Valid {
		pinnedTweet.Media = media.String
	}

	response := responses.CreateSuccessResponse[models.Tweet](&responses.Success[models.Tweet]{
		Status: fasthttp.StatusOK,
		Data:   pinnedTweet,
	})

	ctx.SetStatusCode(fasthttp.StatusOK)
	ctx.Write(response)
}
