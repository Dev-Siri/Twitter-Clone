package env

import (
	"os"
	"twitter/logging"
)

func GetPORT() string {
	port := os.Getenv("PORT")

	if port == "" {
		go logging.Logger.Warn("Environment variable PORT not set. Defaulting to 3000")
		return "3000"
	}

	return port
}
