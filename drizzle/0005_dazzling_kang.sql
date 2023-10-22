ALTER TABLE "Tweets" RENAME COLUMN "post_id" TO "tweet_id";--> statement-breakpoint
ALTER TABLE "Tweets" ALTER COLUMN "user_id" SET DATA TYPE char(36);--> statement-breakpoint
ALTER TABLE "Tweets" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "Tweets" ALTER COLUMN "tweet_id" SET DATA TYPE char(36);