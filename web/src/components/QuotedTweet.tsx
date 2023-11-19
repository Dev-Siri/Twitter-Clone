import Image from "next/image";
import Link from "next/link";
import { lazy } from "react";

import type { Tweet, User } from "@/types";

import { getRelativeTime } from "@/utils/date";
import { getMediaType } from "@/utils/image";
import queryClient from "@/utils/queryClient";

import Error from "./icons/Error";

const VideoPlayer = lazy(() => import("./VideoPlayer"));

interface Props {
  id: string;
}

export default async function QuotedTweet({ id }: Props) {
  const tweetResponse = await queryClient<
    Tweet & Pick<User, "name" | "userImage" | "tag">
  >(`/tweets/${id}`, {
    cache: "no-cache",
  });

  if (!tweetResponse.success)
    return (
      <div className="h-2/4 flex flex-col items-center justify-center text-red-600">
        <Error height={20} width={20} />
        <p className="font-semibold">Failed to load Tweet</p>
      </div>
    );

  const { caption, createdAt, name, tag, tweetId, media, userImage } =
    tweetResponse.data;
  const mediaType = media && (await getMediaType(media));

  return (
    <div className="border-2 w-full border-slate-800 rounded-lg my-2 hover:bg-[#0f0f0f]">
      <Link href={`/${tag}/status/${tweetId}`}>
        <div className="p-3">
          <div className="flex items-center gap-2">
            <Image
              src={userImage}
              alt={name}
              height={30}
              width={30}
              className="rounded-full"
            />
            <p className="text-gray-500 text-base">
              <span className="font-semibold text-white">{name} </span>
              <span>@{tag} </span>
              <span>· {getRelativeTime(createdAt)}</span>
            </p>
          </div>
          <p className="text-base mt-2">{caption}</p>
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
      </Link>
    </div>
  );
}
