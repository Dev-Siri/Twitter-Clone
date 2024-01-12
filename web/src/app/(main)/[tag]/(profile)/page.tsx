import type { ApiResponseTweet, FetchParameters } from "@/types";

import { LIMIT } from "@/constants/fetch";
import queryClient from "@/utils/queryClient";

import Error from "@/components/icons/Error";
import LoadMore from "@/components/LoadMore";
import NoTweets from "@/components/NoTweets";
import Tweet from "@/components/Tweet";

interface Props {
  params: { tag: string };
}

export default async function Profile({ params: { tag } }: Props) {
  const [tweetsResponse, pinnedTweetResponse] = await Promise.all([
    queryClient<ApiResponseTweet<"platform">[]>(`/users/${tag}/tweets`, {
      cache: "no-cache",
      searchParams: {
        page: 1,
        limit: LIMIT,
      },
    }),
    queryClient<ApiResponseTweet<"platform">>(`/users/${tag}/tweets/pinned`, {
      cache: "no-cache",
    }),
  ]);

  if (!tweetsResponse.success) {
    if (tweetsResponse.status === 404) return <NoTweets tag={tag} />;

    return (
      <div className="flex flex-col py-10 items-center justify-center text-red-500">
        <Error height={24} width={24} />
        <p>Failed to load tweets</p>
      </div>
    );
  }

  async function fetchMoreTweets({ page }: FetchParameters) {
    "use server";

    const moreTweetsResponse = await queryClient<
      ApiResponseTweet<"platform">[]
    >(`/users/${tag}/tweets`, {
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
      {pinnedTweetResponse.success && pinnedTweetResponse.status !== 404 && (
        <Tweet {...pinnedTweetResponse.data} pinned />
      )}
      {tweetsResponse.data.map((tweet) => (
        <Tweet {...tweet} key={tweet.tweetId} />
      ))}
      <LoadMore fetcher={fetchMoreTweets} fetcherParameters={{ tag }} />
    </>
  );
}
