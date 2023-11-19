import { Suspense } from "react";

import type { Tweet as TweetType, User } from "@/types";

import queryClient from "@/utils/queryClient";

import Tweet from "@/components/Tweet";
import Loading from "@/components/ui/Loading";

interface Props {
  replyTweetId: string | null;
}

export default async function TweetChain({ replyTweetId }: Props) {
  if (!replyTweetId) return null;

  const tweetResponse = await queryClient<
    TweetType & Pick<User, "name" | "userImage" | "tag">
  >(`/tweets/${replyTweetId}`, {
    cache: "no-store",
  });

  if (!tweetResponse.success)
    return (
      <div className="p-4">
        <div className="bg-gray-900 p-3 rounded-md border border-gray-800 text-gray-500">
          {tweetResponse.status === 404
            ? "This tweet could not be found"
            : tweetResponse.message}
        </div>
      </div>
    );

  return (
    <>
      <Tweet {...tweetResponse.data} />
      {tweetResponse.data.inReplyToTweetId && (
        <Suspense
          fallback={
            <div className="flex items-center justify-center p-4">
              <Loading />
            </div>
          }
        >
          <TweetChain replyTweetId={tweetResponse.data.inReplyToTweetId} />
        </Suspense>
      )}
    </>
  );
}
