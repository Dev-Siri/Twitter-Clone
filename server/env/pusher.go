package env

import (
	"os"
	"twitter/logging"
)

func GetPusherKeys() (string, string, string, string) {
	pusherAppId := os.Getenv("PUSHER_APP_ID")
	pusherKey := os.Getenv("PUSHER_KEY")
	pusherSecret := os.Getenv("PUSHER_SECRET")
	pusherCluster := os.Getenv("PUSHER_CLUSTER")

	if pusherAppId == "" || pusherKey == "" || pusherSecret == "" || pusherCluster == "" {
		logging.Logger.Error("No Pusher App ID, Secret, Key, or Cluster set. Exiting...")
		os.Exit(1)
	}

	return pusherAppId, pusherKey, pusherSecret, pusherCluster
}
