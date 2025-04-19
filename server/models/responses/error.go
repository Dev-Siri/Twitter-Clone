package responses

import (
	"encoding/json"
	"twitter/logging"

	"go.uber.org/zap"
)

type Error struct {
	Status  int    `json:"status"`
	Success bool   `json:"success"`
	Message string `json:"message"`
}

func CreateErrorResponse(errorResponse *Error) []byte {
	errorResponse.Success = false
	jsonBytes, err := json.Marshal(errorResponse)

	if err != nil {
		go logging.Logger.Error("Failed to serialize response", zap.Error(err))
		return nil
	}

	return jsonBytes
}
