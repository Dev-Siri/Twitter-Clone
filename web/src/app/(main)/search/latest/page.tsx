import type { Metadata } from "next";

import getLatestTweetsByQuery from "@/actions/tweets/getLatestByQuery";
import LoadMoreTweets from "@/components/LoadMoreTweets";

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
  const tweets = await getLatestTweetsByQuery({ page: 1, query: q });

  return (
    <>
      {tweets}
      <LoadMoreTweets
        fetcher={getLatestTweetsByQuery}
        fetcherParameters={{ query: q }}
      />
    </>
  );
}
