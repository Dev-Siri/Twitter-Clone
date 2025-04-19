package middleware

import (
	"strings"

	"github.com/valyala/fasthttp"
)

// Ensure consistent JSON responses. This disallows text responses
func Json(next fasthttp.RequestHandler) fasthttp.RequestHandler {
	return func(ctx *fasthttp.RequestCtx) {
		if !strings.HasSuffix(string(ctx.Path()), "/live") {			
			ctx.SetContentType("application/json")
		}

		next(ctx)
	}
}
