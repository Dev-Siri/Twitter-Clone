import type { ApiResponseTweet, FetchParameters } from "@/types";
import type { Metadata } from "next";

import { LIMIT } from "@/constants/fetch";
import queryClient from "@/utils/queryClient";

import LoadMore from "@/components/LoadMore";
import ErrorIcon from "@/components/icons/Error";
import TweetCard from "@/components/tweet/TweetCard";

interface Props {
  searchParams: {
    q: string;
  };
}

export function generateMetadata({ searchParams }: Props): Metadata {
  return {
    title: `${searchParams.q} - Search / Twitter`,
  };
}

export default async function LatestSearch({ searchParams: { q } }: Props) {
  const tweetsResponse = await queryClient<ApiResponseTweet<"platform">[]>(
    `/tweets/search/latest?q=${encodeURIComponent}`,
    {
      cache: "no-store",
      searchParams: {
        page: 1,
        limit: LIMIT,
        q: encodeURIComponent(q),
      },
    }
  );

  if (!tweetsResponse.success) {
    if (tweetsResponse.status === 404)
      return (
        <div className="flex flex-col items-center justify-center pt-20">
          <h3>No results for &quot;{q}&quot;</h3>
          <p>
            Try searching for something else, or check your Search settings to
            see if they’re protecting you from potentially sensitive content.
          </p>
        </div>
      );

    return (
      <div className="flex flex-col items-center justify-center text-red-500 pt-20">
        <ErrorIcon height={24} width={24} />
        <p>Failed to search Tweets matching search &quot;{q}&quot;</p>
      </div>
    );
  }

  async function fetchMoreTweetsByQuery({
    page,
    query,
  }: FetchParameters & { query: string }) {
    "use server";

    const moreTweetsResponse = await queryClient<
      ApiResponseTweet<"platform">[]
    >(`/tweets/search/latest?q=${encodeURIComponent(query)}`, {
      cache: "no-store",
      searchParams: {
        page,
        limit: LIMIT,
        q: encodeURIComponent(q),
      },
    });

    if (moreTweetsResponse.success)
      return (
        moreTweetsResponse?.data?.map((tweet) => (
          <TweetCard key={tweet.tweetId} {...tweet} />
        )) ?? []
      );

    return [];
  }

  return (
    <>
      {tweetsResponse.data.map((tweet) => (
        <TweetCard key={tweet.tweetId} {...tweet} />
      ))}
      <LoadMore
        fetcher={fetchMoreTweetsByQuery}
        fetcherParameters={{ query: q }}
      />
    </>
  );
}
