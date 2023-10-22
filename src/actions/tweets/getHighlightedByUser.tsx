"use server";
import { eq } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { tweets, users } from "@/db/schema";

export default async function getHighlightedTweetByUser({
  tag,
}: {
  tag: string;
}) {
  const [{ highlightedTweetId }] = await db
    .select({ highlightedTweetId: users.highlightedTweetId })
    .from(users)
    .where(eq(users.tag, tag));

  if (!highlightedTweetId) return null;

  const [highlightedTweet] = await db
    .select({
      tweetId: tweets.tweetId,
      caption: tweets.caption,
      media: tweets.media,
      createdAt: tweets.createdAt,
      name: users.name,
      userImage: users.userImage,
      tag: users.tag,
    })
    .from(tweets)
    .innerJoin(users, eq(users.userId, tweets.userId))
    .where(eq(tweets.tweetId, highlightedTweetId));

  return highlightedTweet;
}
