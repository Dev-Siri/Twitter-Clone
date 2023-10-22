"use server";
import { eq } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { tweets } from "@/db/schema";

export default async function deleteTweet(tweetId: string) {
  await db.delete(tweets).where(eq(tweets.tweetId, tweetId));
}
