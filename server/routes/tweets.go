package routes

import (
	tweet_controllers "twitter/controllers/tweets"

	"github.com/fasthttp/router"
)

func RegisterTweetsRoutes(r *router.Router) {
	r.GET("/tweets", tweet_controllers.GetTweets)
	r.POST("/tweets", tweet_controllers.CreateTweet)
	r.GET("/tweets/{id}", tweet_controllers.GetTweet)
	r.GET("/tweets/count", tweet_controllers.GetTweetCountByUser)
	r.DELETE("/tweets/{id}", tweet_controllers.DeleteTweet)
	r.GET("/tweets/{id}/engagements", tweet_controllers.GetTweetEngagements)
	r.GET("/tweets/{id}/engagements/already-liked", tweet_controllers.IsTweetAlreadyLiked)
	r.GET("/tweets/{id}/engagements/already-retweeted", tweet_controllers.IsTweetAlreadyRetweeted)
}
