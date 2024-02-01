import { redirect } from "next/navigation";

import type { ApiResponseTweet, FetchParameters } from "@/types";

import { useSession } from "@/hooks/useSession";
import queryClient from "@/utils/queryClient";

import LoadMore from "@/components/LoadMore";
import ErrorIcon from "@/components/icons/Error";
import TweetCard from "@/components/tweet/TweetCard";
import { LIMIT } from "@/constants/fetch";

export default async function BookmarksList() {
  const user = useSession();

  if (!user) redirect("/auth");

  const bookmarkedTweetsResponse = await queryClient<
    ApiResponseTweet<"platform">[]
  >(`/users/${user.tag}/tweets/bookmarked`, {
    cache: "no-cache",
    searchParams: {
      page: 1,
      limit: LIMIT,
      userId: user.userId,
    },
  });

  async function fetchMoreBookmarkedTweets({
    page,
    tag,
  }: FetchParameters & { tag: string }) {
    "use server";

    const moreTweetsResponse = await queryClient<
      ApiResponseTweet<"platform">[]
    >(`/users/${tag}/tweets/bookmarked`, {
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
      {bookmarkedTweetsResponse.success ? (
        <>
          {bookmarkedTweetsResponse.data.map((tweet) => (
            <TweetCard key={tweet.tweetId} {...tweet} />
          ))}
          <LoadMore
            fetcher={fetchMoreBookmarkedTweets}
            fetcherParameters={{ tag: user.tag }}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center mt-28">
          {bookmarkedTweetsResponse.status === 404 ? (
            <div className="px-28">
              <h3 className="text-4xl font-bold">
                Bookmark Tweets to save them for later
              </h3>
              <p className="mt-3 text-gray-500 leading-tight">
                Need more time to write a clever response or just want to save a
                Tweet for later? Bookmark it!
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-red-500">
              <ErrorIcon height={24} width={24} />
              <p>Failed to get bookmarks</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
