import type { FetchParameters } from "@/actions/types";
import type { Tweet as TweetType, User } from "@/types";

import { LIMIT } from "@/constants/fetch";
import queryClient from "@/utils/queryClient";

import Error from "@/components/icons/Error";
import LoadMore from "@/components/LoadMore";
import NoTweets from "@/components/NoTweets";
import Tweet from "@/components/Tweet";

interface Props {
  params: { tag: string };
}

type ResTweet = Omit<TweetType, "platform"> &
  Pick<User, "name" | "userImage" | "tag">;

export default async function Profile({ params: { tag } }: Props) {
  const [tweetsResponse, pinnedTweetResponse] = await Promise.all([
    queryClient<ResTweet[]>(`/users/${tag}/tweets`, {
      cache: "no-cache",
      searchParams: {
        page: 1,
        limit: LIMIT,
      },
    }),
    queryClient<ResTweet>(`/users/${tag}/tweets/pinned`),
  ]);

  if (!tweetsResponse.success)
    return (
      <div className="flex flex-col py-10 items-center justify-center text-red-500">
        <Error height={24} width={24} />
        <p>Failed to load tweets</p>
      </div>
    );

  async function fetchMoreTweets({ page }: FetchParameters) {
    "use server";

    const moreTweetsResponse = await queryClient<
      (Omit<TweetType, "platform"> & Pick<User, "name" | "userImage" | "tag">)[]
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

  return !!tweetsResponse.data.length ? (
    <>
      {pinnedTweetResponse.success && pinnedTweetResponse.status !== 404 && (
        <Tweet {...pinnedTweetResponse.data} pinned />
      )}
      {tweetsResponse.data.map((tweet) => (
        <Tweet {...tweet} key={tweet.tweetId} />
      ))}
      <LoadMore fetcher={fetchMoreTweets} fetcherParameters={{ tag }} />
    </>
  ) : (
    <NoTweets tag={tag} />
  );
}
