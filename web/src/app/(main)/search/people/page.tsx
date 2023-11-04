import type { Metadata } from "next";

import getUsersByQuery from "@/actions/users/getByQuery";

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

export default async function PeopleSearch({ searchParams: { q } }: Props) {
  const users = await getUsersByQuery({ page: 1, query: q });

  return (
    <>
      {users}
      <LoadMoreTweets
        fetcher={getUsersByQuery}
        fetcherParameters={{ query: q }}
      />
    </>
  );
}
