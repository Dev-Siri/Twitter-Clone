"use server";
import { eq } from "drizzle-orm";

import { db } from "@/db/drizzle";
import {
  likes,
  tweets,
  users,
  type Tweet as TweetType,
  type User,
} from "@/db/schema";

import Tweet from "@/components/Tweet";

export default async function getTweetsByUserLikes({ tag }: { tag: string }) {
  const [{ userId }] = await db
    .select({ userId: users.userId })
    .from(users)
    .where(eq(users.tag, tag));

  const userLikes = await db
    .select({ tweetId: likes.tweetId })
    .from(likes)
    .where(eq(likes.userId, userId));

  const fetchedTweets: (Omit<TweetType, "userId" | "inReplyToTweetId"> &
    Pick<User, "name" | "userImage" | "tag">)[] = [];

  for (const userLike of userLikes) {
    const [tweet] = await db
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
      .where(eq(tweets.tweetId, userLike.tweetId));

    fetchedTweets.push(tweet);
  }

  return fetchedTweets.map((tweet) => <Tweet key={tweet.tweetId} {...tweet} />);
}
