package env

import (
	"os"
	"twitter/logging"
)

func GetCorsOrigin() string {
	corsOrigin := os.Getenv("CORS_ORIGIN")

	if corsOrigin == "" {
		go logging.Logger.Warn("No CORS_ORIGIN set, defaulting to localhost:3000")
		return "http://localhost:3000"
	}

	return corsOrigin
}
