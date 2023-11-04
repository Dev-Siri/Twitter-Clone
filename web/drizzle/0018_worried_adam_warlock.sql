ALTER TABLE "Users" ALTER COLUMN "pinned_tweet_id" SET DATA TYPE char(36);--> statement-breakpoint
ALTER TABLE "Users" ALTER COLUMN "highlighted_tweet_id" SET DATA TYPE char(36);