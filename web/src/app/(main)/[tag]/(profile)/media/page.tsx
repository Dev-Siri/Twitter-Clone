import type { User } from "@/db/schema";
import type { ApiResponseTweet, FetchParameters } from "@/types";
import type { Metadata } from "next";

import queryClient from "@/utils/queryClient";

import LoadMore from "@/components/LoadMore";
import NoTweets from "@/components/NoTweets";
import Tweet from "@/components/Tweet";
import Error from "@/components/icons/Error";
import { LIMIT } from "@/constants/fetch";

interface Props {
  params: { tag: string };
}

export async function generateMetadata({
  params: { tag },
}: Props): Promise<Metadata> {
  const userResponse = await queryClient<
    Omit<User, "email" | "pinnedTweetId" | "highlightedTweetId">
  >(`/users/${tag}`);

  if (!userResponse.success) {
    if (userResponse.status === 404) return { title: "Profile / Twitter" };

    throw new globalThis.Error(userResponse.message);
  }

  return {
    title: `Media tweets by ${userResponse.data.name} (@${tag}) / Twitter`,
  };
}

export default async function Media({ params: { tag } }: Props) {
  const tweetsResponse = await queryClient<ApiResponseTweet<"platform">[]>(
    `/users/${tag}/tweets/media`,
    {
      cache: "no-cache",
      searchParams: {
        page: 1,
        limit: LIMIT,
      },
    }
  );

  async function fetchMoreMediaTweetsByUser({ page }: FetchParameters) {
    "use server";

    const moreMediaTweetsResponse = await queryClient<
      ApiResponseTweet<"platform">[]
    >(`/users/${tag}/tweets/media`, {
      cache: "no-store",
      searchParams: {
        page,
        limit: LIMIT,
      },
    });

    if (moreMediaTweetsResponse.success)
      return (
        moreMediaTweetsResponse?.data?.map((tweet) => (
          <Tweet key={tweet.tweetId} {...tweet} />
        )) ?? []
      );

    return [];
  }

  return tweetsResponse.success ? (
    <>
      {tweetsResponse.data.map((tweet) => (
        <Tweet key={tweet.tweetId} {...tweet} />
      ))}
      <LoadMore
        fetcher={fetchMoreMediaTweetsByUser}
        fetcherParameters={{ tag }}
      />
    </>
  ) : tweetsResponse.status === 404 ? (
    <NoTweets
      title={`@${tag} hasn't liked any tweets`}
      subtitle="When they do, those Tweets will show up here."
      tag={tag}
    />
  ) : (
    <div className="flex flex-col items-center justify-center p-4 text-red-500">
      <Error height={24} width={24} />
      <p>Failed to get Media Tweets</p>
    </div>
  );
}
