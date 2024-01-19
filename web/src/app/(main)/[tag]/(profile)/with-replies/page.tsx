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
    title: `Tweets with replies by ${userResponse.data.name} (@${tag}) / Twitter`,
  };
}

export default async function Replies({ params: { tag } }: Props) {
  const tweetsResponse = await queryClient<ApiResponseTweet<"platform">[]>(
    `/users/${tag}/tweets/with-replies`,
    {
      cache: "no-cache",
      searchParams: {
        page: 1,
        limit: LIMIT,
      },
    }
  );

  if (!tweetsResponse.success) {
    if (tweetsResponse.status === 404) return <NoTweets tag={tag} />;

    return (
      <div className="flex flex-col py-10 items-center justify-center text-red-500">
        <Error height={24} width={24} />
        <p>Failed to load Tweets with replies</p>
      </div>
    );
  }

  async function fetchMoreTweetsWithReplies({ page }: FetchParameters) {
    "use server";

    const moreTweetsResponse = await queryClient<
      ApiResponseTweet<"platform">[]
    >(`/users/${tag}/tweets/with-replies`, {
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
        <TweetCard {...tweet} key={tweet.tweetId} />
      ))}
      <LoadMore
        fetcher={fetchMoreTweetsWithReplies}
        fetcherParameters={{ tag }}
      />
    </>
  );
}
