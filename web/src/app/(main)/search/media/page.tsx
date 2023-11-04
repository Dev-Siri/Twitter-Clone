import type { Metadata } from "next";

import getTweetsMediaByQuery from "@/actions/tweets/getMediaByQuery";

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
  const tweets = await getTweetsMediaByQuery({ page: 1, query: q });

  return (
    <>
      {tweets}
      <LoadMoreTweets
        fetcher={getTweetsMediaByQuery}
        fetcherParameters={{ query: q }}
      />
    </>
  );
}
