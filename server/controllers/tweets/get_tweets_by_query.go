package tweet_controllers

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

func GetTweetsByQuery(ctx *fasthttp.RequestCtx) {
	searchParams := ctx.QueryArgs()
	page, limit := utils.GetPaginationParams(searchParams)
	query := string(searchParams.Peek("q"))

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
    WHERE t.caption ILIKE '%' || $1 || '%'
    LIMIT $2 OFFSET $3;
  `, query, limit, page)

	if err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to load Tweets",
		})

		go logging.Logger.Error("Failed to load Tweets", zap.Error(err))
		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	defer rows.Close()

	var tweets []models.Tweet
	var found bool

	for rows.Next() {
		found = true

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
			Message: "No Tweets with that query",
		})

		go logging.Logger.Error("No Tweets with that query", zap.String("query", query))

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
