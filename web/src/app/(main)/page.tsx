import Image from "next/image";
import { Suspense } from "react";

import type { FetchParameters } from "@/actions/types";
import type { Tweet as TweetType, User } from "@/types";
import type { Metadata } from "next";

import { LIMIT } from "@/constants/fetch";
import { useSession } from "@/hooks/useSession";
import queryClient from "@/utils/queryClient";

import CreateTweet from "@/components/CreateTweet";
import HeadTitle from "@/components/HeadTitle";
import LoadMoreTweets from "@/components/LoadMoreTweets";
import Tweet from "@/components/Tweet";
import Error from "@/components/icons/Error";
import Loading from "@/components/ui/Loading";

export const metadata: Metadata = {
  title: "Home / Twitter",
};

type HomeTweets = (Omit<TweetType, "platform"> &
  Pick<User, "name" | "userImage" | "tag">)[];

async function Tweets() {
  const tweetsResponse = await queryClient<HomeTweets>("/tweets", {
    cache: "no-store",
    tags: ["home-tweets"],
    searchParams: {
      page: 1,
      limit: LIMIT,
    },
  });

  if (!tweetsResponse.success)
    return (
      <article className="h-2/4 flex flex-col items-center justify-center text-red-600">
        <Error height={20} width={20} />
        <p className="font-semibold">Failed to load Tweets</p>
      </article>
    );

  async function fetchMoreTweets({ page }: FetchParameters) {
    "use server";

    const moreTweetsResponse = await queryClient<HomeTweets>("/tweets", {
      cache: "no-store",
      tags: ["home-tweets"],
      searchParams: {
        page,
        limit: LIMIT,
      },
    });

    if (moreTweetsResponse.success)
      return (
        moreTweetsResponse?.data?.map((tweet) => (
          <Tweet key={tweet.tweetId} {...tweet} />
        )) ?? []
      );

    return [];
  }

  return (
    <>
      {tweetsResponse.data.map((tweet) => (
        <Tweet key={tweet.tweetId} {...tweet} />
      ))}
      <LoadMoreTweets fetcher={fetchMoreTweets} />
    </>
  );
}

export default function Home() {
  const user = useSession();

  return (
    <>
      <HeadTitle>Home</HeadTitle>
      {user && (
        <section className="flex p-4 gap-4 mt-2 border-b border-b-gray-800">
          <Image
            src={user.userImage}
            alt={user.name}
            height={44}
            width={44}
            className="h-11 w-11 rounded-full"
          />
          <CreateTweet />
        </section>
      )}
      <Suspense
        fallback={
          <div className="flex items-center justify-center p-4">
            <Loading />
          </div>
        }
      >
        <Tweets />
      </Suspense>
    </>
  );
}
