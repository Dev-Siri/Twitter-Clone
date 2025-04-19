package user_controllers

import (
	"twitter/db"
	"twitter/logging"
	"twitter/models/responses"

	"github.com/google/uuid"
	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

func OpenDm(ctx *fasthttp.RequestCtx) {
	receiver := ctx.UserValue("tag").(string)
	sender := string(ctx.QueryArgs().Peek("sender"))

	row := db.Database.QueryRow(`
		SELECT COUNT(*) FROM "DirectMessages"
		WHERE sender_tag = $1 AND receiver_tag = $2
	`, sender, receiver)

	var numberOfTimesDmOpened int

	if err := row.Scan(&numberOfTimesDmOpened); err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to get the amount of times DM was already open",
		})

		go logging.Logger.Error("Failed to get the amount of times DM was already open", zap.Error(err))

		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	if numberOfTimesDmOpened > 0 {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusForbidden,
			Message: "DM already opened with the person",
		})

		go logging.Logger.Error("DM already opened with the person", zap.String("receiver", receiver))

		ctx.SetStatusCode(fasthttp.StatusForbidden)
		ctx.Write(response)
		return
	}

	_, err := db.Database.Exec(`
		INSERT INTO "DirectMessages" (dm_id, receiver_tag, sender_tag)
		VALUES ( $1, $2, $3 )
	`, uuid.NewString(), receiver, sender)

	if err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to open DM with @" + receiver,
		})

		go logging.Logger.Error("Failed to open DM with receiver", zap.String("receiver", receiver), zap.Error(err))

		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	response := responses.CreateSuccessResponse[string](&responses.Success[string]{
		Status: fasthttp.StatusCreated,
		Data:   "Successfully opened @" + sender + "'s DM with @" + receiver,
	})

	ctx.SetStatusCode(fasthttp.StatusCreated)
	ctx.Write(response)
}
