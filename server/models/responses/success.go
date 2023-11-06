package responses

import (
	"encoding/json"
	"twitter/logging"

	"go.uber.org/zap"
)

type Success[T any] struct {
	Status int `json:"status"`
	Data   T   `json:"data"`
}

func CreateSuccessResponse[T any](successResponse *Success[T]) []byte {
	jsonBytes, err := json.Marshal(successResponse)

	if err != nil {
		go logging.Logger.Error("Failed to serialize response", zap.Error(err))
		return nil
	}

	return jsonBytes
}