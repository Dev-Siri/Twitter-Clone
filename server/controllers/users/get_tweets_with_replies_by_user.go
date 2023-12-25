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

func GetTweetsWithRepliesByUser(ctx *fasthttp.RequestCtx) {
	page, limit := utils.GetPaginationParams(ctx.QueryArgs())
	tag := ctx.UserValue("tag").(string)

	rows, err := db.Database.Query(`
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
		WHERE u.tag = $1
		GROUP BY t.tweet_id, u.name, u.user_image, u.tag
		ORDER BY t.created_at DESC
		LIMIT $2 OFFSET $3;
	`, tag, limit, page)

	if err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to get tweets with replies by user tag",
		})

		go logging.Logger.Error("Failed to get tweets with replies by user tag", zap.String("tag", tag), zap.Error(err))
		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	var tweets []models.Tweet

	for rows.Next() {
		var tweet models.Tweet
		var media sql.NullString

		if err := rows.Scan(
			&tweet.Caption,
			&tweet.CreatedAt,
			&media,
			&tweet.TweetId,
			&tweet.UserId,
			&tweet.Name,
			&tweet.UserImage,
			&tweet.Tag,
		); err != nil {
			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusInternalServerError,
				Message: "Failed to decode tweets",
			})

			go logging.Logger.Error("Failed to decode tweets", zap.Error(err))
			ctx.SetStatusCode(fasthttp.StatusInternalServerError)
			ctx.Write(response)
			return
		}

		if media.Valid {
			tweet.Media = media.String
		}

		tweets = append(tweets, tweet)
	}

	response := responses.CreateSuccessResponse[[]models.Tweet](&responses.Success[[]models.Tweet]{
		Status: fasthttp.StatusOK,
		Data:   tweets,
	})

	ctx.SetStatusCode(fasthttp.StatusOK)
	ctx.Write(response)
}
