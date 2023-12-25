import type { Metadata } from "next";

import getLatestTweetsByQuery from "@/actions/tweets/getLatestByQuery";
import LoadMore from "@/components/LoadMore";

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
      <LoadMore
        fetcher={getLatestTweetsByQuery}
        fetcherParameters={{ query: q }}
      />
    </>
  );
}
