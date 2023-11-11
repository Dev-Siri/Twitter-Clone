package models

import "time"

type User struct {
	UserId             string    `json:"userId"`
	Name               string    `json:"name"`
	Bio                string    `json:"bio,omitempty"`
	Location           string    `json:"location,omitempty"`
	Website            string    `json:"website,omitempty"`
	Banner             string    `json:"banner,omitempty"`
	Tag                string    `json:"tag"`
	UserImage          string    `json:"userImage"`
	Birthday           time.Time `json:"birthday"`
	Email              string    `json:"email"`
	Password           string    `json:"password"`
	CreatedAt          time.Time `json:"createdAt"`
	PinnedTweetId      string    `json:"pinnedTweetId,omitempty"`
	HighlightedTweetId string    `json:"highlightedTweetId,omitempty"`
}
