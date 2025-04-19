package user_controllers

import (
	"twitter/db"
	"twitter/logging"
	"twitter/models"
	"twitter/models/responses"

	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

func GetDms(ctx *fasthttp.RequestCtx) {
	sender := ctx.UserValue("tag").(string)

	rows, err := db.Database.Query(`
		SELECT
			dm.dm_id,
			dm.receiver_tag,
			ru.name,
			ru.user_image,
			dm.sender_tag,
			su.name,
			su.user_image
		FROM "DirectMessages" dm
		INNER JOIN "Users" ru
      ON dm.receiver_tag = ru.tag
    INNER JOIN "Users" su
      ON dm.sender_tag = su.tag
		WHERE dm.sender_tag = $1 OR dm.receiver_tag = $1;
	`, sender)

	if err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to get DMs",
		})

		go logging.Logger.Error("Failed to get DMs", zap.Error(err))

		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	defer rows.Close()

	var dms []models.DirectMessage
	var found bool

	for rows.Next() {
		found = true

		var dm models.DirectMessage
		var receiver models.Communicator
		var sender models.Communicator

		if err := rows.Scan(
			&dm.DmId,
			&receiver.Tag,
			&receiver.Name,
			&receiver.UserImage,
			&sender.Tag,
			&sender.Name,
			&sender.UserImage,
		); err != nil {
			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusInternalServerError,
				Message: "Failed to load DMs",
			})

			go logging.Logger.Error("Failed to load DMs", zap.Error(err))

			ctx.SetStatusCode(fasthttp.StatusInternalServerError)
			ctx.Write(response)
			return
		}

		dm.Receiver = receiver
		dm.Sender = sender

		dms = append(dms, dm)
	}

	if !found {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusNotFound,
			Message: "No DMs opened by user",
		})

		go logging.Logger.Error("No DMs opened by user")

		ctx.SetStatusCode(fasthttp.StatusNotFound)
		ctx.Write(response)
		return
	}

	response := responses.CreateSuccessResponse[[]models.DirectMessage](&responses.Success[[]models.DirectMessage]{
		Status: fasthttp.StatusOK,
		Data:   dms,
	})

	ctx.SetStatusCode(fasthttp.StatusOK)
	ctx.Write(response)
}
