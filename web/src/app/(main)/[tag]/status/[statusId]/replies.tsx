import type { ApiResponseTweet } from "@/types";

import { LIMIT } from "@/constants/fetch";
import queryClient from "@/utils/queryClient";

import LoadMore from "@/components/LoadMore";
import Tweet from "@/components/Tweet";
import Error from "@/components/icons/Error";
import { FetchParameters } from "@/types";

interface Props {
  tweetId: string;
}

export default async function TweetReplies({ tweetId }: Props) {
  const repliesResponse = await queryClient<ApiResponseTweet<"platform">[]>(
    `/tweets/${tweetId}/engagements/replies`,
    {
      cache: "no-store",
      searchParams: {
        page: 1,
        limit: LIMIT,
      },
    }
  );

  if (!repliesResponse.success)
    return (
      <div className="flex flex-col items-center justify-center text-red-500 p-10">
        <Error height={24} width={24} />
        <p>Failed to load replies</p>
      </div>
    );

  async function fetchMoreTweetReplies({ page }: FetchParameters) {
    "use server";

    const moreTweetsResponse = await queryClient<
      ApiResponseTweet<"platform">[]
    >(`/tweets/${tweetId}/engagements/replies`, {
      cache: "no-store",
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
      {repliesResponse.data &&
        repliesResponse.data.map((reply) => (
          <Tweet {...reply} key={reply.tweetId} />
        ))}
      <LoadMore
        fetcher={fetchMoreTweetReplies}
        fetcherParameters={{ tweetId }}
      />
    </>
  );
}
