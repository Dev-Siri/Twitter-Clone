package pusher

import (
	"twitter/env"

	"github.com/pusher/pusher-http-go/v5"
)

var Pusher pusher.Client

func InitPusherClient() {
	appId, key, secret, cluster := env.GetPusherKeys()

	pusherClient := pusher.Client{
		AppID:   appId,
		Key:     key,
		Secret:  secret,
		Cluster: cluster,
		Secure:  true,
	}

	Pusher = pusherClient
}
