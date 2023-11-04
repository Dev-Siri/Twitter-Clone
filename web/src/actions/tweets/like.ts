"use server";
import { and, eq, sql } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { likes } from "@/db/schema";
import { useSession } from "@/hooks/useSession";

type LikeResult =
  | { success: false }
  | {
      success: true;
      type: "like" | "unlike";
    };

export default async function likeTweet(tweetId: string): Promise<LikeResult> {
  const user = useSession();

  if (!user) return { success: false };

  const tweetAndUserEqual = and(
    eq(likes.tweetId, tweetId),
    eq(likes.userId, user.userId)
  );

  const [{ likeCount }] = await db
    .select({ likeCount: sql<number>`count(*)` })
    .from(likes)
    .where(tweetAndUserEqual);

  if (likeCount > 0) {
    // perform unlike instead
    await db.delete(likes).where(tweetAndUserEqual);
    return {
      success: true,
      type: "unlike",
    };
  }

  await db.insert(likes).values({
    likeId: crypto.randomUUID(),
    tweetId,
    userId: user.userId,
  });

  return {
    success: true,
    type: "like",
  };
}
