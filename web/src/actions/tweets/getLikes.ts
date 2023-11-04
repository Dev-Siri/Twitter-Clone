"use server";
import { eq, sql } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { likes } from "@/db/schema";

export default async function getTweetLikes(tweetId: string) {
  const [{ likeCount }] = await db
    .select({ likeCount: sql<number>`count(*)` })
    .from(likes)
    .where(eq(likes.tweetId, tweetId));

  return likeCount;
}
