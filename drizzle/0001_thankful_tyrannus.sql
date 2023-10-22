ALTER TABLE "Users" ADD PRIMARY KEY ("user_id");--> statement-breakpoint
ALTER TABLE "Users" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Users" ALTER COLUMN "password" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Tweets" ADD COLUMN "post_id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "Users" ADD COLUMN "birthday" date NOT NULL;