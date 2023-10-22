"use server";
import { desc, eq } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { tweets, users } from "@/db/schema";

export default async function getTweet({ tweetId }: { tweetId: string }) {
  const tweet = await db
    .select({
      tweetId: tweets.tweetId,
      caption: tweets.caption,
      media: tweets.media,
      createdAt: tweets.createdAt,
      inReplyToTweetId: tweets.inReplyToTweetId,
      name: users.name,
      userImage: users.userImage,
      tag: users.tag,
    })
    .from(tweets)
    .innerJoin(users, eq(users.userId, tweets.userId))
    .limit(1)
    .groupBy(tweets.tweetId, users.name, users.userImage, users.tag)
    .orderBy(desc(tweets.createdAt))
    .where(eq(tweets.tweetId, tweetId));

  return tweet?.[0] as (typeof tweet)[0] | null;
}
