package middleware

import "github.com/valyala/fasthttp"

// Ensure consistent JSON responses. This disallows text responses and
func Json(next fasthttp.RequestHandler) fasthttp.RequestHandler {
	return func(ctx *fasthttp.RequestCtx) {
		ctx.SetContentType("application/json")
		next(ctx)
	}
}
