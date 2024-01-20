import Image from "next/image";
import Link from "next/link";
import { lazy } from "react";

import type { ApiResponseTweet } from "@/types";

import { useSession } from "@/hooks/useSession";
import { getRelativeTime } from "@/utils/date";
import { getMediaType } from "@/utils/image";
import queryClient from "@/utils/queryClient";
import { getTwitterStatusUuid, isTwitterStatusUrl } from "@/utils/url";

import InteractiveText from "../InteractiveText";
import ProfilePreview from "../ProfilePreview";
import PinIcon from "../icons/Pin";
import RetweetIcon from "../icons/Retweet";
import DropdownMenu from "../ui/DropdownMenu";
import TweetInteractions from "./TweetInteractions";
import TweetOptions from "./TweetOptions";

const VideoPlayer = lazy(() => import("../VideoPlayer"));

interface Props
  extends ApiResponseTweet<"userId" | "inReplyToTweetId" | "platform"> {
  pinned?: boolean;
  /**
   * Use this prop if the Tweet component is part of a chain.
   * Like a reply chain which shows the hierarchy of the Tweets.
   */
  chained?: boolean;
}

export default async function Tweet({ pinned, chained, ...props }: Props) {
  const user = useSession();

  let retweet: ApiResponseTweet | null = null;

  if (isTwitterStatusUrl(props.caption)) {
    const retweetResponse = await queryClient<ApiResponseTweet>(
      `/tweets/${getTwitterStatusUuid(props.caption)}`,
      {
        cache: "no-store",
      }
    );

    if (!retweetResponse.success) return null;

    retweet = retweetResponse.data;
  }

  const { name, tag, caption, media, userImage, tweetId, createdAt } =
    retweet ?? props;

  const mediaType = media && (await getMediaType(media));

  return (
    <article
      className={`pb-2 duration-200 hover:bg-gray-200 dark:hover:bg-really-dark ${
        !chained && "border-b-gray-300 dark:border-b-gray-800"
      }`}
    >
      {(pinned || retweet) && (
        <p className="flex gap-2 items-center text-gray-500 font-semibold text-sm pl-5 pt-2">
          {retweet && <RetweetIcon height={15} width={15} />}
          {pinned && <PinIcon height={15} width={15} />}
          <Link href={`/${props.tag}`} className="hover:underline">
            {retweet ? `${props.name} Retweeted` : `Pinned by @${tag}`}
          </Link>
        </p>
      )}
      <Link
        href={`/${tag}/status/${props.tweetId}`}
        className={`flex p-4 pb-0 gap-3 ${(pinned || retweet) && "pt-2"}`}
      >
        <Image
          src={userImage}
          alt={name}
          height={40}
          width={40}
          className={`rounded-full hover:opacity-90 duration-200 ${
            chained ? "h-10 w-10" : "h-11 w-11"
          }`}
        />
        <div className="w-full">
          <div className="flex w-full gap-2 items-center">
            <ProfilePreview tag={tag}>
              <div className="flex">
                <p className="font-bold hover:underline">{name}</p>
                <p className="text-gray-500 ml-2">@{tag} ·</p>
              </div>
            </ProfilePreview>
            <time dateTime={createdAt} className="text-sm text-gray-500">
              {getRelativeTime(createdAt)}
            </time>
            {tag === user?.tag && (
              <div className="ml-auto">
                <DropdownMenu label="Tweet Options">
                  <TweetOptions tweetId={tweetId} currentUserId={user.userId} />
                </DropdownMenu>
              </div>
            )}
          </div>
          <div className="mb-2">
            <InteractiveText>{caption}</InteractiveText>
          </div>
          {media && (
            <div className="mb-2">
              {mediaType === "image" ? (
                <Image
                  src={media}
                  alt={caption}
                  height={300}
                  width={300}
                  className="rounded-md"
                />
              ) : (
                // only possible alternative render is video
                // otherwise invalid.
                mediaType === "video" && <VideoPlayer url={media} />
              )}
            </div>
          )}
        </div>
      </Link>
      <div className="ml-[67px]">
        <TweetInteractions
          tweetId={tweetId}
          actualTweetofRetweetId={props.tweetId}
          layout="card"
        />
      </div>
    </article>
  );
}