package main

import (
	"context"
	"fmt"
	"log"
	error_controllers "twitter/controllers/errors"
	"twitter/db"
	"twitter/env"
	"twitter/logging"
	"twitter/middleware"
	"twitter/routes"

	"github.com/fasthttp/router"
	"github.com/valyala/fasthttp"
)

func main() {
	if err := logging.InitLogger(); err != nil {
		log.Fatal("Failed to initialize logger.")
		return
	}

	env.InitDotEnv()

	if err := db.Connect(env.GetDBUrl()); err != nil {
		logging.Logger.Error("Failed to initialize database")
		return
	}

	defer db.Database.Close(context.Background())

	r := router.New()

	r.HandleOPTIONS = true
	r.NotFound = error_controllers.NotFound
	r.MethodNotAllowed = error_controllers.MethodNotAllowed

	addr := ":" + env.GetPORT()

	routes.RegisterTweetsRoutes(r)

	handler := middleware.Log(middleware.CORS(r.Handler))

	fmt.Println(fasthttp.ListenAndServe(addr, handler))
}
