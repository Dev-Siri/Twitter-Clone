package db

import (
	"context"

	"github.com/jackc/pgx/v5"
)

var Database *pgx.Conn

func Connect(url string) error {
	db, err := pgx.Connect(context.Background(), url)

	if err != nil {
		return err
	}

	Database = db
	return nil
}
