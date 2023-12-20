import { notFound } from "next/navigation";
import { Suspense } from "react";

import type { Tweet as TweetType, User } from "@/types";
import type { Metadata } from "next";

import queryClient from "@/utils/queryClient";
import { getTwitterStatusUuid, isTwitterStatusUrl } from "@/utils/url";

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
  const tweetResponse = await queryClient<
    TweetType & Pick<User, "name" | "userImage" | "tag">
  >(`/tweets/${statusId}`, {
    cache: "no-store",
  });

  if (tweetResponse.status === 404)
    return { title: "Page not found / Twitter" };

  if (!tweetResponse.success) return { title: "Error loading page / twitter" };

  let retweet: (TweetType & Pick<User, "name" | "userImage" | "tag">) | null =
    null;

  if (isTwitterStatusUrl(tweetResponse.data.caption)) {
    const retweetResponse = await queryClient<
      TweetType & Pick<User, "name" | "userImage" | "tag">
    >(`/tweets/${getTwitterStatusUuid(tweetResponse.data.caption)}`, {
      cache: "no-store",
    });

    if (!retweetResponse.success) {
      if (retweetResponse.status === 404)
        return { title: "Page not found / Twitter" };

      return { title: "Error loading page / Twitter" };
    }

    retweet = retweetResponse.data;
  }

  const { name, caption } = retweet ?? tweetResponse.data;

  return { title: `${name} on Twitter: "${caption}" / Twitter` };
}

export default async function Status({ params: { statusId } }: Props) {
  const tweetResponse = await queryClient<
    TweetType & Pick<User, "name" | "userImage" | "tag">
  >(`/tweets/${statusId}`, {
    cache: "no-store",
  });

  if (!tweetResponse.success) {
    if (tweetResponse.status === 404) notFound();

    throw new Error(tweetResponse.message);
  }

  return (
    <>
      <HeadTitle showBackButton>Tweet</HeadTitle>
      <TweetChain replyTweetId={tweetResponse.data.inReplyToTweetId} />
      <Suspense
        fallback={
          <div className="flex items-center justify-center mt-4">
            <Loading />
          </div>
        }
      >
        <Tweet id={statusId} />
      </Suspense>
    </>
  );
}
