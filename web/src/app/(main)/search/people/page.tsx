import Link from "next/link";

import type { FetchParameters, User } from "@/types";
import type { Metadata } from "next";

import { LIMIT } from "@/constants/fetch";
import queryClient from "@/utils/queryClient";

import LoadMore from "@/components/LoadMore";
import UserTile from "@/components/UserTile";
import ErrorIcon from "@/components/icons/Error";

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
  const usersResponse = await queryClient<
    Pick<User, "userId" | "userImage" | "name" | "tag" | "bio">[]
  >("/users/search", {
    searchParams: {
      page: 1,
      limit: LIMIT,
      q: encodeURIComponent(q),
    },
  });

  if (!usersResponse.success) {
    if (usersResponse.status === 404)
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
        <p>Failed to search people matching search &quot;{q}&quot;</p>
      </div>
    );
  }

  async function fetchMoreUsers({ page }: FetchParameters) {
    "use server";

    const moreUsersResponse = await queryClient<
      Pick<User, "userId" | "userImage" | "name" | "tag" | "bio">[]
    >("/tweets", {
      cache: "no-store",
      searchParams: {
        page,
        limit: LIMIT,
        q: encodeURIComponent(q),
      },
    });

    if (moreUsersResponse.success)
      return (
        moreUsersResponse?.data?.map((user) => (
          <Link key={user.userId} href={`/${user.tag}`}>
            <UserTile {...user} />
          </Link>
        )) ?? []
      );

    return [];
  }

  return (
    <>
      {usersResponse.data.map((user) => (
        <Link key={user.userId} href={`/${user.tag}`}>
          <UserTile {...user} />
        </Link>
      ))}
      {usersResponse.data.length > 4 && (
        <LoadMore fetcher={fetchMoreUsers} fetcherParameters={{ query: q }} />
      )}
    </>
  );
}
