package pusher_channels

import (
	"twitter/models"
	"twitter/pusher"
	"twitter/utils"
)

func SendDirectMessage(message *models.Message, dmId string) error {
	data := utils.StructToMap(message)
	channel := "dm_" + dmId

	return pusher.Pusher.Trigger(channel, "message_create", data)
}
