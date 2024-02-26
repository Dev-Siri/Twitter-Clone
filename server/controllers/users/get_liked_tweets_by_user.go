package user_controllers

import (
	"database/sql"
	"twitter/db"
	"twitter/logging"
	"twitter/models"
	"twitter/models/responses"
	"twitter/utils"

	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

func GetLikedTweetsByUser(ctx *fasthttp.RequestCtx) {
	page, limit := utils.GetPaginationParams(ctx.QueryArgs())
	tag := ctx.UserValue("tag").(string)

	row := db.Database.QueryRow(`
		SELECT user_id FROM "Users"
		WHERE tag = $1;
	`, tag)

	var userId string

	if err := row.Scan(&userId); err != nil {
		if err == sql.ErrNoRows {
			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusNotFound,
				Message: "User doesn't exist",
			})

			go logging.Logger.Error("User doesn't exist", zap.String("tag", tag), zap.Error(err))

			ctx.SetStatusCode(fasthttp.StatusNotFound)
			ctx.Write(response)
			return
		}

		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to get userId of user",
		})

		go logging.Logger.Error("Failed to get userId of user with tag", zap.String("tag", tag), zap.Error(err))

		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	likeRows, err := db.Database.Query(`
		SELECT tweet_id FROM "Likes"
		WHERE user_id = $1
		LIMIT $2 OFFSET $3;
	`, userId, limit, page)

	if err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to get all liked Tweets",
		})

		go logging.Logger.Error("Failed to get all liked Tweets", zap.String("tag", tag), zap.Error(err))

		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	defer likeRows.Close()

	var tweets []models.Tweet
	var found bool

	for likeRows.Next() {
		found = true

		var likedTweetId string

		if err := likeRows.Scan(&likedTweetId); err != nil {
			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusInternalServerError,
				Message: "Failed to scan liked Tweet id",
			})

			go logging.Logger.Error("Failed to scan liked Tweet id", zap.String("tag", tag), zap.Error(err))

			ctx.SetStatusCode(fasthttp.StatusInternalServerError)
			ctx.Write(response)
			return
		}

		tweetRow := db.Database.QueryRow(`
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
		`, likedTweetId)

		var tweet models.Tweet
		var media sql.NullString

		if err := tweetRow.Scan(
			&tweet.Caption,
			&tweet.CreatedAt,
			&media,
			&tweet.TweetId,
			&tweet.UserId,
			&tweet.Name,
			&tweet.UserImage,
			&tweet.Tag,
		); err != nil {
			// maybe the tweet was deleted, so continue forward without including that in
			if err == sql.ErrNoRows {
				continue
			}

			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusInternalServerError,
				Message: "Failed to decode Tweets",
			})

			go logging.Logger.Error("Failed to decode Tweets", zap.Error(err))
			ctx.SetStatusCode(fasthttp.StatusInternalServerError)
			ctx.Write(response)
			return
		}

		if media.Valid {
			tweet.Media = media.String
		}

		tweets = append(tweets, tweet)
	}

	if !found {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusNotFound,
			Message: "No Liked Tweets by user",
		})

		go logging.Logger.Error("No Liked Tweets by user", zap.String("tag", tag))

		ctx.SetStatusCode(fasthttp.StatusNotFound)
		ctx.Write(response)
		return
	}

	response := responses.CreateSuccessResponse[[]models.Tweet](&responses.Success[[]models.Tweet]{
		Status: fasthttp.StatusOK,
		Data:   tweets,
	})

	ctx.SetStatusCode(fasthttp.StatusOK)
	ctx.Write(response)
}
