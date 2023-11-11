package utils

import (
	"net/mail"
	"unicode"
)

func IsEmailValid(email string) bool {
	_, err := mail.ParseAddress(email)

	return err == nil
}

func IsTagValid(tag string) bool {
	for _, char := range tag {
		if !unicode.IsLetter(char) || unicode.IsNumber(char) || char == '_' {
			return false
		}
	}

	return true
}
