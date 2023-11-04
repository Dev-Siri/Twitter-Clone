import { Suspense } from "react";

import type { Metadata } from "next";

import getTweet from "@/actions/tweets/getOne";
import getTweetReplyId from "@/actions/tweets/getReplyId";

import HeadTitle from "@/components/HeadTitle";
import Loading from "@/components/ui/Loading";
import Tweet from "./tweet";
import TweetChain from "./tweet-chain";

interface Props {
  params: {
    statusId: string;
    tag: string;
  };
}

export async function generateMetadata({
  params: { statusId },
}: Props): Promise<Metadata> {
  const tweet = await getTweet({ tweetId: statusId });

  if (!tweet)
    return {
      title: "Page not found / Twitter",
    };

  const { name, caption } = tweet;

  return { title: `${name} on Twitter: "${caption}" / Twitter` };
}

export default async function Status({ params: { statusId } }: Props) {
  const replyTweetId = await getTweetReplyId({ tweetId: statusId });

  return (
    <>
      <HeadTitle showBackButton>Tweet</HeadTitle>
      <TweetChain replyTweetId={replyTweetId} />
      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <Loading />
          </div>
        }
      >
        <Tweet id={statusId} />
      </Suspense>
    </>
  );
}
