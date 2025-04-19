package models

type Engagement struct {
	Likes       int `json:"likes"`
	Replies     int `json:"replies"`
	Retweets    int `json:"retweets"`
	QuoteTweets int `json:"quoteTweets"`
	Bookmarks   int `json:"bookmarks"`
}
