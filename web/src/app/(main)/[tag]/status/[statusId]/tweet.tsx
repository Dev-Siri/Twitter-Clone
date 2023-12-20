import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, lazy } from "react";

import type { Tweet as TweetType, User } from "@/types";

import { useSession } from "@/hooks/useSession";
import { getTweetCreatedDate } from "@/utils/date";
import { getMediaType } from "@/utils/image";
import { getPlatformText } from "@/utils/platform";
import queryClient from "@/utils/queryClient";
import { getTwitterStatusUuid, isTwitterStatusUrl } from "@/utils/url";

import CreateTweet from "@/components/CreateTweet";
import TweetInteractions from "@/components/TweetInteractions";
import TweetText from "@/components/TweetText";
import Retweet from "@/components/icons/Retweet";
import Loading from "@/components/ui/Loading";
import TweetReplies from "./replies";

const VideoPlayer = lazy(() => import("@/components/VideoPlayer"));

interface Props {
  id: string;
}

export default async function Tweet({ id }: Props) {
  const tweetResponse = await queryClient<
    TweetType & Pick<User, "name" | "userImage" | "tag">
  >(`/tweets/${id}`, {
    cache: "no-store",
  });

  if (tweetResponse.status === 404) notFound();

  if (!tweetResponse.success) throw new Error(tweetResponse.message);

  let retweet: (TweetType & Pick<User, "name" | "userImage" | "tag">) | null =
    null;

  if (isTwitterStatusUrl(tweetResponse.data.caption)) {
    const retweetResponse = await queryClient<
      TweetType & Pick<User, "name" | "userImage" | "tag">
    >(`/tweets/${getTwitterStatusUuid(tweetResponse.data.caption)}`, {
      cache: "no-store",
    });

    if (!retweetResponse.success) return null;

    retweet = retweetResponse.data;
  }

  const { name, tag, caption, media, userImage, tweetId, platform, createdAt } =
    retweet ?? tweetResponse.data;

  const mediaType = media && (await getMediaType(media));
  const user = useSession();

  return (
    <article className={`py-4 ${retweet && "pt-2"}`}>
      <div className="px-4">
        {retweet && (
          <p className="flex gap-2 items-center text-gray-500 font-semibold text-sm pl-5 py-1">
            <Retweet height={15} width={15} />
            <Link
              href={`/${tweetResponse.data.tag}`}
              className="hover:underline"
            >
              {tweetResponse.data.name} retweeted
            </Link>
          </p>
        )}
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
          <div className="mt-4 text-lg">
            <TweetText>{caption}</TweetText>
          </div>
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
          <Link
            className="flex gap-1 w-fit"
            href={`/${tag}/status/${tweetId}`}
            scroll={false}
          >
            <time
              dateTime={createdAt}
              className="text-gray-500 cursor-pointer hover:underline"
            >
              {getTweetCreatedDate(createdAt)}
            </time>
            <p className="text-gray-500">
              ·{" "}
              <span className="text-twitter-blue hover:underline">
                {getPlatformText(platform)}
              </span>
            </p>
          </Link>
        </section>
      </div>
      <section className="mt-4 mx-4 flex justify-around py-2 border-y-gray-800 border-y">
        <TweetInteractions
          actualTweetofRetweetId={id}
          tweetId={tweetId}
          layout="page"
        />
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
  );
}
