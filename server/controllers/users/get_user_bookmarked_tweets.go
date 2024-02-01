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

func GetUserBookmarkedTweets(ctx *fasthttp.RequestCtx) {
	page, limit := utils.GetPaginationParams(ctx.QueryArgs())
	tag := ctx.Value("tag").(string)

	rows, err := db.Database.Query(`
		SELECT tweet_id from "Bookmarks"
		WHERE tag = $1
		LIMIT $2 OFFSET $3;
	`, tag, limit, page)

	if err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to get bookmarks",
		})

		go logging.Logger.Error("Failed to get bookmarks", zap.String("tag", tag), zap.Error(err))

		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	var tweets []models.Tweet
	var found bool

	for rows.Next() {
		found = true
		var tweetId string
		var tweet models.Tweet
		var media sql.NullString

		if err := rows.Scan(&tweetId); err != nil {
			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusInternalServerError,
				Message: "Failed to decode Tweet id",
			})

			go logging.Logger.Error("Failed to decode Tweet id", zap.Error(err))

			ctx.SetStatusCode(fasthttp.StatusInternalServerError)
			ctx.Write(response)
			return
		}

		row := db.Database.QueryRow(`
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
		`)

		if err := row.Scan(
			&tweet.Caption,
			&tweet.CreatedAt,
			&media,
			&tweet.TweetId,
			&tweet.UserId,
			&tweet.Name,
			&tweet.UserImage,
			&tweet.Tag,
		); err != nil {
			if err == sql.ErrNoRows {
				continue
			}

			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusInternalServerError,
				Message: "Failed to decode bookmarked Tweet",
			})

			go logging.Logger.Error("Failed to decode bookmarked Tweet", zap.Error(err))
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
			Message: "User has no bookmarks",
		})

		go logging.Logger.Error("User with tag has no bookmarks", zap.String("tag", tag), zap.Error(err))

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
