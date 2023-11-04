import Image from "next/image";
import Link from "next/link";
import { lazy } from "react";

import type { Tweet, User } from "@/db/schema";

import { useSession } from "@/hooks/useSession";
import { getRelativeTime } from "@/utils/date";
import { getMediaType } from "@/utils/image";

import TweetInteractions from "./TweetInteractions";
import TweetOptions from "./TweetOptions";
import TweetText from "./TweetText";
import DropdownMenu from "./ui/DropdownMenu";

const VideoPlayer = lazy(() => import("./VideoPlayer"));

interface Props
  extends Omit<Tweet, "userId" | "inReplyToTweetId">,
    Pick<User, "name" | "userImage" | "tag"> {
  pinned?: boolean;
}

export default async function Tweet({
  name,
  tag,
  caption,
  media,
  userImage,
  tweetId,
  createdAt,
  pinned,
}: Props) {
  const user = useSession();
  const mediaType = media && (await getMediaType(media));

  return (
    <article className="pb-2 duration-200 hover:bg-[#0f0f0f]">
      {pinned && (
        <p className="text-gray-500 font-semibold text-sm pl-5 pt-2">
          Pinned by @{tag}
        </p>
      )}
      <Link
        href={`/${tag}/status/${tweetId}`}
        className={`flex p-4 pb-0 gap-3 ${pinned && "pt-2"}`}
      >
        <Image
          src={userImage}
          alt={name}
          height={44}
          width={44}
          className="h-11 w-11 rounded-full"
        />
        <section className="w-full">
          <div className="flex w-full gap-2 items-center">
            <p className="font-bold">{name}</p>
            <p className="text-gray-500">@{tag} ·</p>
            <time
              dateTime={createdAt.toISOString()}
              className="text-sm text-gray-500"
            >
              {getRelativeTime(createdAt)}
            </time>
            {tag === user?.tag && (
              <div className="ml-auto">
                <DropdownMenu>
                  <TweetOptions tweetId={tweetId} />
                </DropdownMenu>
              </div>
            )}
          </div>
          <p className="mb-2">
            <TweetText>{caption}</TweetText>
          </p>
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
        </section>
      </Link>
      <div className="ml-[67px]">
        <TweetInteractions tweetId={tweetId} />
      </div>
    </article>
  );
}
