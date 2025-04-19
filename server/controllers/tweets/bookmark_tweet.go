package tweet_controllers

import (
	"twitter/db"
	"twitter/logging"
	"twitter/models/responses"

	"github.com/google/uuid"
	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

func BookmarkTweet(ctx *fasthttp.RequestCtx) {
	tweetId := ctx.UserValue("id").(string)
	tag := string(ctx.QueryArgs().Peek("tag"))

	row := db.Database.QueryRow(`
		SELECT COUNT(*) FROM "Bookmarks"
		WHERE tweet_id = $1 AND tag = $2;
	`, tweetId, tag)

	var bookmarkCount int

	if err := row.Scan(&bookmarkCount); err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to read bookmark count for Tweet",
		})

		go logging.Logger.Error("Failed to read bookmark count for Tweet", zap.String("tweetId", tweetId), zap.Error(err))

		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	if bookmarkCount > 0 {
		_, err := db.Database.Exec(`
			DELETE FROM "Bookmarks"
			WHERE tweet_id = $1 AND tag = $2;
		`, tweetId, tag)

		if err != nil {
			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusInternalServerError,
				Message: "Failed to remove Tweet from bookmarks",
			})

			go logging.Logger.Error("Failed to remove Tweet from bookmarks", zap.Error(err))

			ctx.SetStatusCode(fasthttp.StatusInternalServerError)
			ctx.Write(response)
			return
		}

		response := responses.CreateSuccessResponse[string](&responses.Success[string]{
			Status: fasthttp.StatusOK,
			Data:   "Tweet removed from bookmarks with id: " + tweetId,
		})

		ctx.SetStatusCode(fasthttp.StatusOK)
		ctx.Write(response)
		return
	}

	_, err := db.Database.Exec(`
		INSERT INTO "Bookmarks" (bookmark_id, tweet_id, tag)
		VALUES ($1, $2, $3);
	`, uuid.NewString(), tweetId, tag)

	if err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to add Tweet to bookmarks",
		})

		go logging.Logger.Error("Failed to add Tweet to bookmarks", zap.Error(err))

		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	response := responses.CreateSuccessResponse[string](&responses.Success[string]{
		Status: fasthttp.StatusOK,
		Data:   "Successfully added Tweet to bookmarks with id: " + tweetId,
	})

	ctx.SetStatusCode(fasthttp.StatusOK)
	ctx.Write(response)
}
