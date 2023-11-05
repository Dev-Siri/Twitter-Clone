package env

import (
	"os"
	"twitter/constants"

	"github.com/joho/godotenv"
)

func InitDotEnv() {
	if _, err := os.Stat(constants.EnvFile); err == nil {
		godotenv.Load()
	}
}
