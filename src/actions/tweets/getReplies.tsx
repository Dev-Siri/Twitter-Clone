"use server";
import { desc, eq } from "drizzle-orm";
import type { FetchParameters } from "../types";

import Tweet from "@/components/Tweet";

import { LIMIT } from "@/constants/fetch";
import { db } from "@/db/drizzle";
import { tweets, users } from "@/db/schema";

export default async function getTweetReplies({
  page,
  tweetId,
}: FetchParameters & { tweetId: string }) {
  const replies = await db
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
    .offset((page - 1) * LIMIT)
    .limit(LIMIT)
    .groupBy(tweets.tweetId, users.name, users.userImage, users.tag)
    .orderBy(desc(tweets.createdAt))
    .where(eq(tweets.inReplyToTweetId, tweetId));

  return replies.map((tweet) => <Tweet key={tweet.tweetId} {...tweet} />);
}
