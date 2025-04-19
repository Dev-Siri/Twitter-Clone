package user_controllers

import (
	"encoding/json"
	"twitter/constants"
	"twitter/db"
	"twitter/logging"
	"twitter/models"
	"twitter/models/responses"
	"twitter/utils"

	"github.com/google/uuid"
	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
	"golang.org/x/crypto/bcrypt"
)

func Signup(ctx *fasthttp.RequestCtx) {
	var body models.User

	if err := json.Unmarshal(ctx.Request.Body(), &body); err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to decode your info",
		})

		go logging.Logger.Error("Failed to deserialize body", zap.Error(err))
		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	if !utils.IsEmailValid(body.Email) {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusBadRequest,
			Message: "Invalid email",
		})

		go logging.Logger.Error("Invalid email")
		ctx.SetStatusCode(fasthttp.StatusBadRequest)
		ctx.Write(response)
		return
	}

	if body.Password == "" {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusBadRequest,
			Message: "Password is required",
		})

		go logging.Logger.Error("Password is required")
		ctx.SetStatusCode(fasthttp.StatusBadRequest)
		ctx.Write(response)
		return
	}

	if len(body.Password) <= 8 {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusBadRequest,
			Message: "Password needs to be above 8 characters",
		})

		go logging.Logger.Error("Password needs to be above 8 characters")
		ctx.SetStatusCode(fasthttp.StatusBadRequest)
		ctx.Write(response)
		return
	}

	if body.Name == "" {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusBadRequest,
			Message: "Name is required",
		})

		go logging.Logger.Error("Name is required")
		ctx.SetStatusCode(fasthttp.StatusBadRequest)
		ctx.Write(response)
		return
	}

	if !utils.IsTagValid(body.Tag) {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusBadRequest,
			Message: "Your username contains invalid characters",
		})

		go logging.Logger.Error("Your username contains invalid characters")
		ctx.SetStatusCode(fasthttp.StatusBadRequest)
		ctx.Write(response)
		return
	}

	if body.Birthday.IsZero() {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusBadRequest,
			Message: "Birthdate is required",
		})

		go logging.Logger.Error("Birthdate is required")
		ctx.SetStatusCode(fasthttp.StatusBadRequest)
		ctx.Write(response)
		return
	}

	var userRowsCount int

	row := db.Database.QueryRow(`
		SELECT COUNT(*) FROM "Users"
		WHERE email = $1;
	`, body.Email)

	if err := row.Scan(&userRowsCount); err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to check for existing accounts",
		})

		go logging.Logger.Error("Failed to check for existing accounts", zap.Error(err))
		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	if userRowsCount > 0 {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusBadRequest,
			Message: "Account already exists",
		})

		go logging.Logger.Error("Account already exists")
		ctx.SetStatusCode(fasthttp.StatusBadRequest)
		ctx.Write(response)
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(body.Password), 12)

	if err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to hash your password",
		})

		go logging.Logger.Error("Failed to hash your password", zap.Error(err))
		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	userId := uuid.NewString()

	_, err = db.Database.Exec(`
		INSERT INTO "Users" (user_id, tag, name, email, password, user_image, birthday)
		VALUES ( $1, $2, $3, $4, $5, $6, $7 )
	`, userId, body.Tag, body.Name, body.Email, string(hashedPassword), constants.DefaultPfpUrl, body.Birthday)

	if err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to create your account",
		})

		go logging.Logger.Error("Failed to create your account", zap.Error(err))
		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	token, err := utils.CreateUserJWTResponse(userId, body.Name, constants.DefaultPfpUrl, body.Email, body.Tag, body.Birthday)

	if err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to sign a token for your account",
		})

		go logging.Logger.Error("Failed to sign a token for your account", zap.Error(err))
		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	response := responses.CreateSuccessResponse[string](&responses.Success[string]{
		Status: fasthttp.StatusCreated,
		Data:   token,
	})

	ctx.SetStatusCode(fasthttp.StatusCreated)
	ctx.Write(response)
}
