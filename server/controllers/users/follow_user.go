package user_controllers

import (
	"twitter/db"
	"twitter/logging"
	"twitter/models/responses"

	"github.com/google/uuid"
	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

func FollowUser(ctx *fasthttp.RequestCtx) {
	followingTag := ctx.UserValue("tag").(string)
	followerTag := string(ctx.QueryArgs().Peek("follower"))

	row := db.Database.QueryRow(`
		SELECT COUNT(*) FROM "Followers"
		WHERE follower = $1 AND following = $2;
	`, followerTag, followingTag)

	var followCount int

	if err := row.Scan(&followCount); err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to read follow count for user",
		})

		go logging.Logger.Error("Failed to read follow count for user", zap.String("followerTag", followerTag), zap.Error(err))

		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	if followCount > 0 {
		_, err := db.Database.Exec(`
			DELETE FROM "Followers"
			WHERE follower = $1 AND following = $2;
		`, followerTag, followingTag)

		if err != nil {
			response := responses.CreateErrorResponse(&responses.Error{
				Status:  fasthttp.StatusInternalServerError,
				Message: "Failed to unfollow user",
			})

			go logging.Logger.Error("Failed to unfollow user", zap.Error(err))

			ctx.SetStatusCode(fasthttp.StatusInternalServerError)
			ctx.Write(response)
			return
		}

		response := responses.CreateSuccessResponse[string](&responses.Success[string]{
			Status: fasthttp.StatusOK,
			Data:   "Unfollowed user with tag " + followingTag,
		})

		ctx.SetStatusCode(fasthttp.StatusOK)
		ctx.Write(response)
		return
	}

	_, err := db.Database.Exec(`
		INSERT INTO "Followers" (follow_id, follower, following)
		VALUES ($1, $2, $3);
	`, uuid.NewString(), followerTag, followingTag)

	if err != nil {
		response := responses.CreateErrorResponse(&responses.Error{
			Status:  fasthttp.StatusInternalServerError,
			Message: "Failed to follow user",
		})

		go logging.Logger.Error("Failed to follow user", zap.String("followingTag", followerTag), zap.Error(err))

		ctx.SetStatusCode(fasthttp.StatusInternalServerError)
		ctx.Write(response)
		return
	}

	response := responses.CreateSuccessResponse[string](&responses.Success[string]{
		Status: fasthttp.StatusOK,
		Data:   "@" + followerTag + " is now following @" + followingTag,
	})

	ctx.SetStatusCode(fasthttp.StatusOK)
	ctx.Write(response)

}
