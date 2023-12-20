package tweet_controllers

import (
	"twitter/db"
	"twitter/logging"
	"twitter/models/responses"

	"github.com/google/uuid"
	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

func LikeTweet(ctx *fasthttp.RequestCtx) {
	tweetId := ctx.UserValue("id").(string)
	userId := string(ctx.QueryArgs().Peek("userId"))

	row := db.Database.QueryRow(`
		SELECT COUNT(*) FROM "Likes"
		WHERE tweet_id = $1 AND user_id = $2;
	`, tweetId, userId)

	var likeCount int

	if err := row.Scan(&likeCount); err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to read like count for tweet",
		})

		go logging.Logger.Error("Failed to read like count for tweet", zap.String("tweetId", tweetId), zap.Error(err))

		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	if likeCount > 0 {
		_, err := db.Database.Exec(`
			DELETE FROM "Likes"
			WHERE tweet_id = $1 AND user_id = $2;
		`, tweetId, userId)

		if err != nil {
			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusInternalServerError,
				Message: "Failed to unlike tweet",
			})

			ctx.SetStatusCode(fasthttp.StatusInternalServerError)
			ctx.Write(response)
			return
		}
	}

	_, err := db.Database.Exec(`
		INSERT INTO "Likes" (like_id, tweet_id, user_id)
		VALUES ($1, $2, $3);
	`, uuid.NewString(), tweetId, userId)

	if err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to like tweet",
		})

		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	response := responses.CreateSuccessResponse[string](&responses.Success[string]{
		Status: fasthttp.StatusOK,
		Data:   "Successfully liked tweet with id: " + tweetId,
	})

	ctx.SetStatusCode(fasthttp.StatusOK)
	ctx.Write(response)
}
