package env

import (
	"os"
	"twitter/logging"
)

func GetJWTSecretKey() string {
	jwtKey := os.Getenv("JWT_SECRET")

	if jwtKey == "" {
		logging.Logger.Error("No DSN (database url) set. Exiting...")
		os.Exit(1)
	}

	return jwtKey
}
