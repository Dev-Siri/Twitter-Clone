package utils

import (
	"time"
	"twitter/env"

	"github.com/dgrijalva/jwt-go"
)

func CreateUserJWTResponse(userId string, name string, userImage string, email string, tag string, birthday time.Time) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userId":    userId,
		"name":      name,
		"userImage": userImage,
		"email":     email,
		"tag":       tag,
		"birthday":  birthday,
	})

	authToken, err := token.SignedString([]byte(env.GetJWTSecretKey()))

	if err != nil {
		return "", err
	}

	return authToken, nil
}
