package user_controllers

import (
	"database/sql"
	"twitter/db"
	"twitter/logging"
	"twitter/models"
	"twitter/models/responses"
	"twitter/utils"

	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

func GetUsersByQuery(ctx *fasthttp.RequestCtx) {
	searchParams := ctx.QueryArgs()
	page, limit := utils.GetPaginationParams(searchParams)
	query := string(searchParams.Peek("q"))

	rows, err := db.Database.Query(`
		SELECT
			user_id,
			user_image,
			name,
			tag,
			bio
		FROM "Users"
		WHERE name ILIKE '%' || $1 || '%'
		OR bio ILIKE '%' || $1 || '%'
		OR tag ILIKE '%' || $1 || '%'
		LIMIT $2 OFFSET $3;
	`, query, limit, page)

	if err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to get users with the given query",
		})

		go logging.Logger.Error("Failed to get users with the given query", zap.String("query", query), zap.Error(err))

		ctx.SetStatusCode(fasthttp.StatusNotFound)
		ctx.Write(response)
		return
	}

	defer rows.Close()

	var users []models.User
	var found bool

	for rows.Next() {
		found = true

		var user models.User
		var banner sql.NullString
		var bio sql.NullString
		var location sql.NullString
		var website sql.NullString

		if err := rows.Scan(
			&user.UserId,
			&user.UserImage,
			&user.Name,
			&user.Tag,
			&bio,
		); err != nil {
			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusInternalServerError,
				Message: "Failed to load user",
			})

			go logging.Logger.Error("Failed to load user", zap.Error(err))

			ctx.SetStatusCode(fasthttp.StatusInternalServerError)
			ctx.Write(response)
			return
		}

		if banner.Valid {
			user.Banner = banner.String
		}

		if bio.Valid {
			user.Bio = bio.String
		}

		if website.Valid {
			user.Website = website.String
		}

		if location.Valid {
			user.Location = location.String
		}

		users = append(users, user)
	}

	if !found {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusNotFound,
			Message: "No users found with the given query",
		})

		go logging.Logger.Error("No users found with the given query", zap.String("query", query))

		ctx.SetStatusCode(fasthttp.StatusNotFound)
		ctx.Write(response)
		return
	}

	response := responses.CreateSuccessResponse[[]models.User](&responses.Success[[]models.User]{
		Status: fasthttp.StatusOK,
		Data:   users,
	})

	ctx.SetStatusCode(fasthttp.StatusOK)
	ctx.Write(response)
}
