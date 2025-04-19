package models

type Communicator struct {
	Name      string `json:"name"`
	UserImage string `json:"userImage"`
	Tag       string `json:"tag"`
}

type DirectMessage struct {
	DmId     string       `json:"dmId"`
	Receiver Communicator `json:"receiver"`
	Sender   Communicator `json:"sender"`
}
