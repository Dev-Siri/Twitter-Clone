ALTER TABLE "Tweets" DROP CONSTRAINT "Tweets_user_id_Users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "Users" ADD COLUMN "pinned_tweet_id" "char";--> statement-breakpoint
ALTER TABLE "Users" ADD COLUMN "highlighted_tweet_id" "char";