package error_controllers

import (
	"twitter/models/responses"

	"github.com/valyala/fasthttp"
)

func NotFound(ctx *fasthttp.RequestCtx) {
	response := responses.CreateErrorResponse(&responses.Error{
		Status:  fasthttp.StatusNotFound,
		Message: "Not found",
	})

	ctx.SetStatusCode(fasthttp.StatusNotFound)
	ctx.Write(response)
}
