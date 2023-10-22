import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, lazy } from "react";

import type { Metadata } from "next";

import getTweet from "@/actions/tweets/getOne";
import { useSession } from "@/hooks/useSession";
import { getTweetCreatedDate } from "@/utils/date";
import { getMediaType } from "@/utils/image";

import CreateTweet from "@/components/CreateTweet";
import HeadTitle from "@/components/HeadTitle";
import TweetInteractions from "@/components/TweetInteractions";
import TweetText from "@/components/TweetText";
import Loading from "@/components/ui/Loading";
import TweetReplies from "./replies";
import TweetChain from "./tweet-chain";

const VideoPlayer = lazy(() => import("@/components/VideoPlayer"));

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
  const tweet = await getTweet({ tweetId: statusId });

  if (!tweet) notFound();

  const {
    tweetId,
    caption,
    createdAt,
    inReplyToTweetId,
    media,
    name,
    tag,
    userImage,
  } = tweet;

  const mediaType = media && (await getMediaType(media));
  const user = useSession();

  return (
    <>
      <HeadTitle showBackButton>Tweet</HeadTitle>
      <TweetChain replyTweetId={inReplyToTweetId} />
      <article className="p-4">
        <section className="flex gap-3">
          <Link href={`/${tag}`}>
            <Image
              src={userImage}
              alt={name}
              height={44}
              width={44}
              className="h-11 w-11 rounded-full"
            />
          </Link>
          <div>
            <h5 className="font-bold">{name}</h5>
            <h6 className="text-gray-500 text-sm">@{tag}</h6>
          </div>
        </section>
        <section>
          <p className="mt-4 text-lg">
            <TweetText>{caption}</TweetText>
          </p>
          {media && (
            <div className="mt-2">
              {mediaType === "image" ? (
                <Image
                  src={media}
                  alt={caption}
                  height={400}
                  width={400}
                  className="w-full rounded-xl"
                />
              ) : (
                // only possible alternative render is video
                // otherwise invalid.
                mediaType === "video" && <VideoPlayer url={media} />
              )}
            </div>
          )}
        </section>
        <section className="mt-4">
          <Link href={`/${tag}/status/${tweetId}`} scroll={false}>
            <time
              suppressHydrationWarning
              dateTime={createdAt.toISOString()}
              className="text-gray-500 cursor-pointer hover:underline"
            >
              {getTweetCreatedDate(createdAt)}
            </time>
          </Link>
        </section>
        <section className="mt-4 py-2 border-y-gray-800 border-y">
          <TweetInteractions tweetId={tweetId} layout="page" />
        </section>
        {user && (
          <section className="flex p-4 gap-4 mt-2 border-b border-b-gray-800">
            <Image
              src={user.userImage}
              alt={user.name}
              height={44}
              width={44}
              className="h-11 w-11 rounded-full"
            />
            <CreateTweet placeholder="Tweet your reply" replyingTo={tweetId} />
          </section>
        )}
        <Suspense
          fallback={
            <div className="flex items-center justify-center p-4">
              <Loading />
            </div>
          }
        >
          <TweetReplies tweetId={tweetId} />
        </Suspense>
      </article>
    </>
  );
}
