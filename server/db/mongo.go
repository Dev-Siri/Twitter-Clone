package db

import (
	"context"
	"twitter/constants"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var chatDB *mongo.Database

func ConnectChat(url, dbName string) error {
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(url))

	if err != nil {
		return err
	}

	chatDB = client.Database(dbName)
	return nil
}

func MessagesCollection() *mongo.Collection {
	return chatDB.Collection(constants.ChatDBMessagesCollection)
}
