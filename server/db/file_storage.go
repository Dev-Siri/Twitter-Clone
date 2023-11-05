package db

import (
	"context"
	"encoding/base64"
	"fmt"
	"strings"
	"time"

	"cloud.google.com/go/storage"
	firebase "firebase.google.com/go"
	"golang.org/x/oauth2/google"

	"google.golang.org/api/option"
)

var storageBucket *storage.BucketHandle

func InitFileStorage() error {
	opt := option.WithCredentials(&google.Credentials{})
	app, err := firebase.NewApp(context.Background(), &firebase.Config{
		ProjectID:     "twitter-fe49d",
		StorageBucket: "twitter-fe49d.appspot.com",
	}, opt)

	if err != nil {
		return err
	}

	firebaseStorage, err := app.Storage(context.Background())

	if err != nil {
		return err
	}

	sb, err := firebaseStorage.DefaultBucket()

	if err != nil {
		return err
	}

	storageBucket = sb

	return nil
}

func UploadDataURL(dataURL string, filepath string) (string, error) {
	if !strings.HasPrefix(dataURL, "data:") {
		return "", fmt.Errorf("invalid data URL")
	}

	dataParts := strings.SplitN(dataURL, ",", 2)
	if len(dataParts) != 2 {
		return "", fmt.Errorf("invalid data URL format")
	}

	base64Data := dataParts[1]

	decodedData, decodeDataError := base64.StdEncoding.DecodeString(base64Data)
	if decodeDataError != nil {
		return "", fmt.Errorf("failed to decode base64 data: %v", decodeDataError)
	}

	obj := storageBucket.Object(filepath)
	writer := obj.NewWriter(context.Background())

	if _, err := writer.Write(decodedData); err != nil {
		return "", fmt.Errorf("failed to write data to storage: %v", err)
	}

	if writeError := writer.Close(); writeError != nil {
		return "", fmt.Errorf("failed to close writer: %v", writeError)
	}

	imageURL, err := storageBucket.SignedURL(filepath, &storage.SignedURLOptions{
		Method:  "GET",
		Expires: time.Date(2491, time.September, 3, 0, 0, 0, 0, time.UTC),
	})

	if err != nil {
		return "", fmt.Errorf("failed to get signed URL: %v", err)
	}

	return imageURL, nil
}
