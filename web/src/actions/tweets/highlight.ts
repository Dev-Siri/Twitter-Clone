"use server";
import { eq } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { useSession } from "@/hooks/useSession";

export default async function highlightTweet(tweetId: string) {
  const user = useSession();

  if (!user) return;

  await db
    .update(users)
    .set({ highlightedTweetId: tweetId })
    .where(eq(users.userId, user.userId));
}
