import { eq, sql } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { tweets } from "@/db/schema";

export default async function getTweetReplyCount(tweetId: string) {
  const [{ replyCount }] = await db
    .select({ replyCount: sql<number>`count(*)` })
    .from(tweets)
    .where(eq(tweets.inReplyToTweetId, tweetId));

  return replyCount;
}
