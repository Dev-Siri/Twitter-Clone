package error_controllers

import (
	"twitter/models/responses"

	"github.com/valyala/fasthttp"
)

func MethodNotAllowed(ctx *fasthttp.RequestCtx) {
	response := responses.CreateErrorResponse(&responses.Error{
		Status:  fasthttp.StatusMethodNotAllowed,
		Message: "Could not " + string(ctx.Request.Header.Method()) + " " + ctx.URI().String(),
	})

	ctx.SetStatusCode(fasthttp.StatusMethodNotAllowed)
	ctx.Write(response)
}
