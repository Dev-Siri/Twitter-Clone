import { Suspense } from "react";

import getTweet from "@/actions/tweets/getOne";

import Tweet from "@/components/Tweet";
import Loading from "@/components/ui/Loading";

interface Props {
  replyTweetId: string | null;
}

export default async function TweetChain({ replyTweetId }: Props) {
  if (!replyTweetId) return null;

  const tweet = await getTweet({ tweetId: replyTweetId });

  if (!tweet) return null;

  return (
    <>
      <Tweet {...tweet} />
      {tweet.inReplyToTweetId && (
        <Suspense
          fallback={
            <div className="flex items-center justify-center p-4">
              <Loading />
            </div>
          }
        >
          <TweetChain replyTweetId={tweet.inReplyToTweetId} />
        </Suspense>
      )}
    </>
  );
}
