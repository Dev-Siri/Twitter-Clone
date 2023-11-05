package routes

import (
	tweet_controllers "twitter/controllers/tweets"

	"github.com/fasthttp/router"
)

func RegisterTweetsRoutes(r *router.Router) {
	r.GET("/tweets", tweet_controllers.GetTweets)
}
