ALTER TABLE "Users" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Users" ALTER COLUMN "user_image" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Tweets" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "Users" DROP COLUMN IF EXISTS "created_at";