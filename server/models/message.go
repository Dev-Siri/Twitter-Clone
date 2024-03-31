package models

import "time"

type Message struct {
	MessageId   string    `json:"messageId" bson:"_id"`
	SenderTag   string    `json:"senderTag" bson:"senderTag"`
	ReceiverTag string    `json:"receiverTag" bson:"receiverTag"`
	CreatedAt   time.Time `json:"createdAt" bson:"createdAt"`
	Message     string    `json:"message" bson:"message"`
}
