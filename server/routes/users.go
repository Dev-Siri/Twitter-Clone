package routes

import (
	user_controllers "twitter/controllers/users"

	"github.com/fasthttp/router"
)

func RegisterUsersRoutes(r *router.Router) {
	r.POST("/users/signup", user_controllers.Signup)
	r.POST("/users/login", user_controllers.Login)
	r.GET("/users/{tag}", user_controllers.GetUser)
	r.GET("/users/{tag}/banner", user_controllers.GetBannerPicture)
	r.GET("/users/{tag}/profile-picture", user_controllers.GetProfilePicture)
	r.GET("/users/{tag}/tweets", user_controllers.GetTweetsByUser)
	r.GET("/users/{tag}/tweets/with-replies", user_controllers.GetTweetsWithRepliesByUser)
	r.GET("/users/{tag}/tweets/pinned", user_controllers.GetUserPinnedTweet)
}
