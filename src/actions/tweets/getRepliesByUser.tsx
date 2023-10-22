"use server";
import { and, desc, eq, isNotNull } from "drizzle-orm";

import type { FetchParameters } from "../types";

import { LIMIT } from "@/constants/fetch";
import { db } from "@/db/drizzle";
import { tweets, users } from "@/db/schema";

import Tweet from "@/components/Tweet";

export default async function getRepliesByUser({
  page,
  tag,
}: FetchParameters & { tag: string }) {
  const fetchedTweets = await db
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
    .where(and(eq(users.tag, tag), isNotNull(tweets.inReplyToTweetId)));

  return fetchedTweets.map((tweet) => <Tweet key={tweet.tweetId} {...tweet} />);
}
