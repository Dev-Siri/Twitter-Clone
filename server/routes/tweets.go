package routes

import (
	tweet_controllers "twitter/controllers/tweets"

	"github.com/fasthttp/router"
)

func RegisterTweetsRoutes(r *router.Router) {
	r.GET("/tweets", tweet_controllers.GetTweets)
	r.POST("/tweets", tweet_controllers.CreateTweet)
	r.GET("/tweets/count", tweet_controllers.GetTweetCountByUser)
	r.GET("/tweets/{id}", tweet_controllers.GetTweet)
	r.DELETE("/tweets/{id}", tweet_controllers.DeleteTweet)
	r.PATCH("/tweets/{id}/like", tweet_controllers.LikeTweet)
	r.PUT("/tweets/{id}/pin", tweet_controllers.PinTweet)
	r.PUT("/tweets/{id}/highlight", tweet_controllers.HighlightTweet)
	r.GET("/tweets/{id}/engagements", tweet_controllers.GetTweetEngagements)
	r.GET("/tweets/{id}/engagements/already-liked", tweet_controllers.IsTweetAlreadyLiked)
	r.GET("/tweets/{id}/engagements/already-retweeted", tweet_controllers.IsTweetAlreadyRetweeted)
}
