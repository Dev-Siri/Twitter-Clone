package main

import (
	"log"
	error_controllers "twitter/controllers/errors"
	"twitter/db"
	"twitter/env"
	"twitter/logging"
	"twitter/middleware"
	"twitter/routes"

	"github.com/fasthttp/router"
	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

func main() {
	if err := logging.InitLogger(); err != nil {
		log.Fatal("Failed to initialize logger.")
		return
	}

	env.InitDotEnv()

	if err := db.Connect(env.GetDBUrl()); err != nil {
		logging.Logger.Error("Failed to initialize database", zap.Error(err))
		return
	}

	if err := db.InitFileStorage(); err != nil {
		logging.Logger.Error("Failed to initialize Firebase Storage", zap.Error(err))
		return
	}

	if db.Database != nil {
		defer db.Database.Close()
	}

	r := router.New()

	r.HandleOPTIONS = true
	r.NotFound = error_controllers.NotFound
	r.MethodNotAllowed = error_controllers.MethodNotAllowed

	addr := ":" + env.GetPORT()

	routes.RegisterTweetsRoutes(r)
	routes.RegisterUsersRoutes(r)

	handler := middleware.Json(middleware.Log(middleware.CORS(r.Handler)))

	logging.Logger.Info("Starting server...", zap.String("address", addr))

	if err := fasthttp.ListenAndServe(addr, handler); err != nil {
		logging.Logger.Error("Failed to start server", zap.Error(err))
	}
}
