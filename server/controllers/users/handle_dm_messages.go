package user_controllers

import (
	"twitter/constants"
	"twitter/logging"
	"twitter/models"
	"twitter/models/responses"

	"github.com/fasthttp/websocket"
	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

var upgrader = websocket.FastHTTPUpgrader{
	ReadBufferSize:  constants.BufferSize,
	WriteBufferSize: constants.BufferSize,
}

func HandleDmMessages(ctx *fasthttp.RequestCtx) {
	err := upgrader.Upgrade(ctx, func(conn *websocket.Conn) {
		var message models.Message

		if err := conn.ReadJSON(&message); err != nil {
			response := responses.Error{
				Success: false,
				Status:  fasthttp.StatusInternalServerError,
				Message: "Failed to read WebSocket message",
			}

			go logging.Logger.Error("Failed to read WebSocket message", zap.Error(err))

			conn.WriteJSON(response)
			return
		}

		conn.WriteJSON(responses.Success[models.Message]{
			Success: true,
			Status:  fasthttp.StatusOK,
			Data:    message,
		})
	})

	if err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "WebSocket connection failed",
		})

		go logging.Logger.Error("WebSocket connection failed", zap.Error(err))

		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}
}
