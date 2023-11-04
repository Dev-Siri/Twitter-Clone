"use server";
import { eq, sql } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { tweets } from "@/db/schema";

export default async function getCountOfTweetByUser(userId: string) {
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(tweets)
    .where(eq(tweets.userId, userId));

  return count;
}
