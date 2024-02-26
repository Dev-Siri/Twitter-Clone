package env

import (
	"os"
	"twitter/logging"
)

func GetChatDBUrl() string {
	dbUrl := os.Getenv("CHAT_DSN")

	if dbUrl == "" {
		logging.Logger.Error("No CHAT_DSN (Chat Database URL) set. Exiting...")
		os.Exit(1)
	}

	return dbUrl
}
