"use server";
import { eq } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { tweets } from "@/db/schema";

export default async function getTweetReplyId({
  tweetId,
}: {
  tweetId: string;
}) {
  const fetchedTweets = await db
    .select({ inReplyToTweetId: tweets.inReplyToTweetId })
    .from(tweets)
    .where(eq(tweets.tweetId, tweetId));

  return fetchedTweets[0]?.inReplyToTweetId;
}
