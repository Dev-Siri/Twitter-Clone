import type { Metadata } from "next";

import getTweetsByQuery from "@/actions/tweets/getByQuery";
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

export default async function TopSearch({ searchParams: { q } }: Props) {
  const tweets = await getTweetsByQuery({ page: 1, query: q });

  return (
    <>
      {tweets}
      <LoadMoreTweets
        fetcher={getTweetsByQuery}
        fetcherParameters={{ query: q }}
      />
    </>
  );
}
