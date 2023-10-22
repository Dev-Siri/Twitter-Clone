"use server";
import { eq } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { tweets, users } from "@/db/schema";
import { useSession } from "@/hooks/useSession";

export default async function getPinnedTweet() {
  const user = useSession();

  if (!user) return;

  const [{ pinnedTweetId }] = await db
    .select({ pinnedTweetId: users.pinnedTweetId })
    .from(users)
    .where(eq(users.tag, user.tag));

  if (!pinnedTweetId) return;

  const tweetList = await db
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
    .where(eq(tweets.tweetId, pinnedTweetId));

  return tweetList?.[0];
}
