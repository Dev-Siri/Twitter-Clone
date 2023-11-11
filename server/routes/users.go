package routes

import (
	user_controllers "twitter/controllers/users"

	"github.com/fasthttp/router"
)

func RegisterUsersRoutes(r *router.Router) {
	r.POST("/users/signup", user_controllers.Signup)
	r.POST("/users/login", user_controllers.Login)
}