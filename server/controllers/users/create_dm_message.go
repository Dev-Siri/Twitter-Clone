package user_controllers

import (
	"context"
	"encoding/json"
	"time"
	"twitter/db"
	"twitter/logging"
	"twitter/models"
	"twitter/models/responses"
	pusher_channels "twitter/pusher/channels"

	"github.com/google/uuid"
	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

func CreateDmMessage(ctx *fasthttp.RequestCtx) {
	id := ctx.UserValue("id").(string)

	message := models.Message{
		DmId:      id,
		MessageId: uuid.NewString(),
		CreatedAt: time.Now().UTC(),
	}

	if err := json.Unmarshal(ctx.Request.Body(), &message); err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to read body",
		})

		go logging.Logger.Error("Failed to read body")

		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	_, err := db.MessagesCollection().InsertOne(context.Background(), message)

	if err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to deliver message",
		})

		go logging.Logger.Error("Failed to deliver message", zap.Error(err))

		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	if err := pusher_channels.SendDirectMessage(&message, id); err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to deliver created message",
		})

		go logging.Logger.Error("Failed to deliver created message", zap.Error(err))

		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	response := responses.CreateSuccessResponse[string](&responses.Success[string]{
		Status: fasthttp.StatusCreated,
		Data:   "Message sent successfully!",
	})

	ctx.SetStatusCode(fasthttp.StatusCreated)
	ctx.Write(response)
}
