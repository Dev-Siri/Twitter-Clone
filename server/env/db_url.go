package env

import (
	"os"
	"twitter/logging"
)

func GetDBUrl() string {
	dbUrl := os.Getenv("DSN")

	if dbUrl == "" {
		logging.Logger.Error("No DSN (database url) set. Exiting...")
		os.Exit(1)
	}

	return dbUrl
}
