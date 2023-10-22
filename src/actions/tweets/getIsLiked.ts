"use server";
import { eq, sql } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { likes } from "@/db/schema";

export default async function getIsTweetLiked(tweetId: string) {
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(likes)
    .where(eq(likes.tweetId, tweetId));

  return count > 0;
}
