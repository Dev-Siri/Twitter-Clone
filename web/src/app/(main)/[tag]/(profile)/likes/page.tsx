import type { ApiResponseTweet, FetchParameters, User } from "@/types";
import type { Metadata } from "next";

import { LIMIT } from "@/constants/fetch";
import queryClient from "@/utils/queryClient";

import LoadMore from "@/components/LoadMore";
import NoTweets from "@/components/NoTweets";
import Error from "@/components/icons/Error";
import TweetCard from "@/components/tweet/TweetCard";

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
    title: `Tweets liked by ${userResponse.data.name} (@${tag}) / Twitter`,
  };
}

export default async function Likes({ params: { tag } }: Props) {
  const tweetsResponse = await queryClient<ApiResponseTweet<"platform">[]>(
    `/users/${tag}/tweets/liked`,
    {
      cache: "no-store",
      searchParams: {
        page: 1,
        limit: LIMIT,
      },
    }
  );

  if (!tweetsResponse.success) {
    if (tweetsResponse.status === 404)
      return (
        <NoTweets
          title={`@${tag} hasn't liked any Tweets yet`}
          subtitle="When they do, they will show up here."
          tag={tag}
        />
      );

    return (
      <div className="flex flex-col items-center justify-center text-red-500 py-10">
        <Error height={24} width={24} />
        <p>Failed to get Liked Tweets</p>
      </div>
    );
  }

  async function fetchMoreLikedTweets({ page }: FetchParameters) {
    "use server";

    const moreTweetsResponse = await queryClient<
      ApiResponseTweet<"platform">[]
    >(`/users/${tag}/tweets/liked`, {
      cache: "no-store",
      searchParams: {
        page,
        limit: LIMIT,
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
      <LoadMore fetcher={fetchMoreLikedTweets} fetcherParameters={{ tag }} />
    </>
  );
}
