package user_controllers

import (
	"database/sql"
	"twitter/db"
	"twitter/logging"
	"twitter/models"
	"twitter/models/responses"

	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

func GetDm(ctx *fasthttp.RequestCtx) {
	dmId := ctx.UserValue("id").(string)

	row := db.Database.QueryRow(`
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
		WHERE dm.dm_id = $1;
	`, dmId)

	var dm models.DirectMessage
	var receiver models.Communicator
	var sender models.Communicator

	if err := row.Scan(
		&dm.DmId,
		&receiver.Tag,
		&receiver.Name,
		&receiver.UserImage,
		&sender.Tag,
		&sender.Name,
		&sender.UserImage,
	); err != nil {
		if err == sql.ErrNoRows {
			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusNotFound,
				Message: "DM could not be found",
			})

			go logging.Logger.Error("DM could not be found", zap.String("dmId", dmId))

			ctx.SetStatusCode(fasthttp.StatusNotFound)
			ctx.Write(response)
			return
		}

		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to get DM",
		})

		go logging.Logger.Error("Failed to get DM", zap.Error(err))

		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	dm.Receiver = receiver
	dm.Sender = sender

	response := responses.CreateSuccessResponse[models.DirectMessage](&responses.Success[models.DirectMessage]{
		Status: fasthttp.StatusOK,
		Data:   dm,
	})

	ctx.SetStatusCode(fasthttp.StatusOK)
	ctx.Write(response)
}
