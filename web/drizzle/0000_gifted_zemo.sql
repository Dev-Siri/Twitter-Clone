CREATE TABLE IF NOT EXISTS "Tweets" (
	"caption" text,
	"post_image" varchar(500),
	"user_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Users" (
	"user_id" serial NOT NULL,
	"name" varchar(255),
	"user_image" varchar(500),
	"email" varchar(255),
	"password" char(36),
	"created_at" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Tweets" ADD CONSTRAINT "Tweets_user_id_Users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
