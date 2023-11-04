import { relations, type InferSelectModel } from "drizzle-orm";
import {
  char,
  date,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("Users", {
  userId: char("user_id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  bio: varchar("bio", { length: 160 }),
  location: varchar("location", { length: 30 }),
  website: varchar("website", { length: 100 }),
  banner: varchar("banner", { length: 500 }),
  tag: varchar("tag", { length: 255 }).notNull().unique(),
  userImage: varchar("user_image", { length: 500 }).notNull(),
  birthday: date("birthday").notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  password: char("password", { length: 60 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  pinnedTweetId: char("pinned_tweet_id", { length: 36 }),
  highlightedTweetId: char("highlighted_tweet_id", { length: 36 }),
});

export const tweets = pgTable("Tweets", {
  tweetId: char("tweet_id", { length: 36 }).primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  caption: text("caption").notNull(),
  media: varchar("media", { length: 500 }),
  userId: char("user_id", { length: 36 }).notNull(),
  inReplyToTweetId: char("in_reply_to_tweet_id", { length: 36 }),
});

export const likes = pgTable("Likes", {
  likeId: char("like_id", { length: 36 }).primaryKey(),
  tweetId: char("tweet_id", { length: 36 }).notNull(),
  userId: char("user_id", { length: 36 }).notNull(),
});

export const usersRelation = relations(users, ({ many }) => ({
  tweets: many(tweets),
}));

export const tweetsRelation = relations(tweets, ({ one }) => ({
  user: one(users, {
    fields: [tweets.userId],
    references: [users.userId],
  }),
}));

export type User = InferSelectModel<typeof users>;
export type Tweet = InferSelectModel<typeof tweets>;
export type Like = InferSelectModel<typeof likes>;
