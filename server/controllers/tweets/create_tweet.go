package tweet_controllers

import (
	"context"
	"encoding/json"
	"time"
	"twitter/db"
	"twitter/logging"
	"twitter/models"
	"twitter/models/responses"
	"twitter/utils"

	"github.com/google/uuid"
	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

func CreateTweet(ctx *fasthttp.RequestCtx) {
	var body models.Tweet

	if err := json.Unmarshal(ctx.Request.Body(), &body); err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to decode tweet",
		})

		go logging.Logger.Error("Failed to deserialize body", zap.Error(err))
		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	if len(body.Caption) > 280 {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusBadRequest,
			Message: "Caption too long",
		})

		go logging.Logger.Error("Caption too long")
		ctx.SetStatusCode(fasthttp.StatusBadRequest)
		ctx.Write(response)
		return
	}

	if body.Platform != "android" && body.Platform != "ios" && body.Platform != "web" {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusBadRequest,
			Message: "Platform must be android, ios or web",
		})

		go logging.Logger.Error("Invalid platform")
		ctx.SetStatusCode(fasthttp.StatusBadRequest)
		ctx.Write(response)
		return
	}

	var mediaUrl string

	if body.Media != "" {
		uploadedMediaUrl, err := db.UploadDataURL(body.Media, "tweets/"+uuid.NewString())

		if err != nil {
			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusInternalServerError,
				Message: "Failed to upload your media file",
			})

			go logging.Logger.Error("Failed to upload media file", zap.Error(err))
			ctx.SetStatusCode(fasthttp.StatusInternalServerError)
			ctx.Write(response)
			return
		}

		mediaUrl = uploadedMediaUrl
	}

	_, err := db.Database.Query(context.Background(), `
		INSERT INTO Tweets(tweet_id, caption, created_at, media, user_id, in_reply_to_tweet_id, platform)
		VALUES ( $1, $2, $3, $4, $5, $6, $7 )
	`, uuid.NewString(), body.Caption, time.Now().UTC(), utils.NewNullableString(mediaUrl), body.UserId, utils.NewNullableString(body.InReplyToTweetId), body.Platform)

	if err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to add tweet",
		})

		go logging.Logger.Error("Failed to add tweet", zap.Error(err))
		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}
}
