package env

import (
	"os"
	"twitter/logging"
)

func GetDBUrl() string {
	dbUrl := os.Getenv("DSN")

	if dbUrl == "" {
		logging.Logger.Error("No DSN (Database URL) set. Exiting...")
		os.Exit(1)
	}

	return dbUrl
}
