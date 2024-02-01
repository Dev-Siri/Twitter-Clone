package routes

import (
	user_controllers "twitter/controllers/users"

	"github.com/fasthttp/router"
)

func RegisterUsersRoutes(r *router.Router) {
	r.POST("/users/signup", user_controllers.Signup)
	r.POST("/users/login", user_controllers.Login)
	r.GET("/users/search", user_controllers.GetUsersByQuery)
	r.GET("/users/{tag}", user_controllers.GetUser)
	r.PUT("/users/{tag}", user_controllers.UpdateUserProfile)
	r.GET("/users/{tag}/banner", user_controllers.GetBannerPicture)
	r.GET("/users/{tag}/profile-picture", user_controllers.GetProfilePicture)
	r.GET("/users/{tag}/tweets", user_controllers.GetTweetsByUser)
	r.GET("/users/{tag}/tweets/with-replies", user_controllers.GetTweetsWithRepliesByUser)
	r.GET("/users/{tag}/tweets/media", user_controllers.GetMediaTweetsByUser)
	r.GET("/users/{tag}/tweets/liked", user_controllers.GetLikedTweetsByUser)
	r.GET("/users/{tag}/tweets/pinned", user_controllers.GetUserPinnedTweet)
	r.GET("/users/{tag}/tweets/highlighted", user_controllers.GetUserHighlightedTweet)
	r.GET("/users/{tag}/tweets/bookmarked", user_controllers.GetUserBookmarkedTweets)
	r.GET("/users/{tag}/followers/count", user_controllers.GetUserFollowerCount)
	r.GET("/users/{tag}/following/count", user_controllers.GetUserFollowingCount)
}
