package models

import "time"

type Tweet struct {
	Caption          string    `json:"caption"`
	CreatedAt        time.Time `json:"createdAt"`
	InReplyToTweetId string    `json:"inReplyToTweetId,omitempty"`
	Media            string    `json:"media,omitempty"`
	TweetId          string    `json:"tweetId"`
	UserId           string    `json:"userId"`
	Name             string    `json:"name"`
	UserImage        string    `json:"userImage"`
	Tag              string    `json:"tag"`
	Platform         string    `json:"platform,omitempty"`
}
