package user_controllers

import (
	"database/sql"
	"twitter/db"
	"twitter/logging"
	"twitter/models"
	"twitter/models/responses"

	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

func GetUser(ctx *fasthttp.RequestCtx) {
	tag := ctx.UserValue("tag").(string)

	row := db.Database.QueryRow(`
		SELECT
			user_id,
			name,
			user_image,
			bio,
			banner,
			location,
			tag,
			website,
			created_at,
			highlighted_tweet_id
		FROM "Users"
		WHERE tag = $1
	`, tag)

	var user models.User
	var banner sql.NullString
	var bio sql.NullString
	var location sql.NullString
	var website sql.NullString
	var highlightedTweetId sql.NullString

	if err := row.Scan(
		&user.UserId,
		&user.Name,
		&user.UserImage,
		&bio,
		&banner,
		&location,
		&user.Tag,
		&website,
		&user.CreatedAt,
		&highlightedTweetId,
	); err != nil {
		if err == sql.ErrNoRows {
			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusNotFound,
				Message: "User doesn't exist",
			})

			go logging.Logger.Error("User doesn't exist", zap.String("tag", tag), zap.Error(err))

			ctx.SetStatusCode(fasthttp.StatusNotFound)
			ctx.Write(response)
			return
		}

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

	if highlightedTweetId.Valid {
		user.HighlightedTweetId = highlightedTweetId.String
	}

	response := responses.CreateSuccessResponse[models.User](&responses.Success[models.User]{
		Status: fasthttp.StatusOK,
		Data:   user,
	})

	ctx.SetStatusCode(fasthttp.StatusOK)
	ctx.Write(response)
}
