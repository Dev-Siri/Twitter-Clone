package env

import (
	"os"
	"twitter/logging"
)

func GetGCPKeysPath() string {
	gcpKeysPath := os.Getenv("GCP_KEYS_PATH")

	if gcpKeysPath == "" {
		logging.Logger.Warn("GCP Keys path not specified, using default keys/gcp-keys.json")
		return "keys/gcp-keys.json"
	}

	return gcpKeysPath
}
