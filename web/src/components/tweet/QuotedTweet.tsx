"use client";
import Image from "next/image";
import { lazy, useEffect, useState } from "react";

import type { ApiResponseTweet } from "@/types";

import { getRelativeTime } from "@/utils/date";
import { getMediaType } from "@/utils/image";
import queryClient from "@/utils/queryClient";

import ButtonLink from "../ButtonLink";
import ErrorIcon from "../icons/Error";
import Loading from "../ui/Loading";

const VideoPlayer = lazy(() => import("../VideoPlayer"));

interface Props {
  id: string;
}

type TweetLoadState =
  | {
      state: "loading";
    }
  | {
      state: "error";
    }
  | {
      state: "success";
      data: ApiResponseTweet;
      mediaType: Awaited<ReturnType<typeof getMediaType>> | undefined | "";
    };

/*
  Yes, this CLIENT component does data fetching. Its because there are many places where this component is used
  under the client boundary, so server-side data-fetching breaks those parts. And its also not that important to
  load this component FIRST. So client data-fetching works fine, and I don't want to over engineer this more.
*/
export default function QuotedTweet({ id }: Props) {
  const [quotedTweet, setQuotedTweet] = useState<TweetLoadState>({
    state: "loading",
  });

  useEffect(() => {
    async function fetchQuotedTweet() {
      const tweetResponse = await queryClient<ApiResponseTweet>(
        `/tweets/${id}`
      );

      if (!tweetResponse.success) return setQuotedTweet({ state: "error" });

      setQuotedTweet({
        state: "success",
        data: tweetResponse.data,
        mediaType:
          tweetResponse.data.media &&
          (await getMediaType(tweetResponse.data.media)),
      });
    }

    fetchQuotedTweet();
  }, [id]);

  if (quotedTweet.state === "loading")
    return (
      <div className="flex items-center justify-center border-2 border-slate-800 rounded-lg p-3 my-2">
        <Loading />
      </div>
    );

  if (quotedTweet.state === "error")
    return (
      <div className="h-2/4 flex flex-col items-center justify-center text-red-600">
        <ErrorIcon height={20} width={20} />
        <p className="font-semibold">Failed to load Tweet</p>
      </div>
    );

  const { caption, createdAt, name, tag, tweetId, media, userImage } =
    quotedTweet.data;

  return (
    <div className="border-2 w-full border-slate-800 rounded-lg my-2 duration-200 hover:bg-really-dark">
      <ButtonLink href={`/${tag}/status/${tweetId}`} className="cursor-pointer">
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
            {quotedTweet.mediaType === "image" ? (
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
              quotedTweet.mediaType === "video" && <VideoPlayer url={media} />
            )}
          </div>
        )}
      </ButtonLink>
    </div>
  );
}
