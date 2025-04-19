package user_controllers

import (
	"context"
	"twitter/db"
	"twitter/logging"
	"twitter/models"
	"twitter/models/responses"

	"github.com/valyala/fasthttp"
	"go.mongodb.org/mongo-driver/bson"
	"go.uber.org/zap"
)

func GetDmMessages(ctx *fasthttp.RequestCtx) {
	id := ctx.UserValue("id").(string)

	cursor, err := db.MessagesCollection().Find(context.Background(), bson.M{
		"dmId": id,
	})

	if err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to get DM Messages",
		})

		go logging.Logger.Error("Failed to get DM Messages", zap.String("id", id))

		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	defer cursor.Close(context.Background())

	var dmMessages []models.Message
	var found bool

	for cursor.Next(context.Background()) {
		found = true
		var dmMessage models.Message

		if err := cursor.Decode(&dmMessage); err != nil {
			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusInternalServerError,
				Message: "Failed to decode messages",
			})

			go logging.Logger.Error("Failed to decode messages", zap.String("id", id), zap.Error(err))

			ctx.SetStatusCode(fasthttp.StatusInternalServerError)
			ctx.Write(response)
			return
		}

		dmMessages = append(dmMessages, dmMessage)
	}

	if !found {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusNotFound,
			Message: "No messages in this DM yet",
		})

		go logging.Logger.Error("No Messages in this DM")

		ctx.SetStatusCode(fasthttp.StatusNotFound)
		ctx.Write(response)
		return
	}

	response := responses.CreateSuccessResponse[[]models.Message](&responses.Success[[]models.Message]{
		Status: fasthttp.StatusOK,
		Data:   dmMessages,
	})

	ctx.SetStatusCode(fasthttp.StatusOK)
	ctx.Write(response)
}
