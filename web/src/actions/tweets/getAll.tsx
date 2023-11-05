"use server";
import type { FetchParameters } from "../types";

import { LIMIT } from "@/constants/fetch";
import queryClient from "@/utils/queryClient";

import Tweet from "@/components/Tweet";

export default async function getAllTweets({ page }: FetchParameters) {
  const fetchedTweets = await queryClient("/tweets", {
    cache: "no-store",
    searchParams: {
      page,
      limit: LIMIT
    }
  });

  return fetchedTweets.map((tweet) => <Tweet key={tweet.tweetId} {...tweet} />);
}
