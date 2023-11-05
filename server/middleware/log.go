package middleware

import (
	"twitter/logging"

	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

func Log(next fasthttp.RequestHandler) fasthttp.RequestHandler {
	return func(ctx *fasthttp.RequestCtx) {
		go logging.Logger.Info(
			"Incoming request",
			zap.String("method", string(ctx.Request.Header.Method())),
			zap.String("endpoint", string(ctx.Request.URI().Path())),
		)

		next(ctx)
	}
}
