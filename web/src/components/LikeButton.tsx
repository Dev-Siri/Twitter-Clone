"use client";
import { lazy, useState } from "react";

import likeTweet from "@/actions/tweets/like";
import { compactify } from "@/utils/formatting";

const HeartFilled = lazy(() => import("./icons/HeartFilled"));
const HeartOutlined = lazy(() => import("./icons/HeartOutlined"));

interface Props {
  tweetId: string;
  initialLikeCount: number;
  isAlreadyLiked: boolean;
}

export default function LikeButton({
  tweetId,
  initialLikeCount,
  isAlreadyLiked,
}: Props) {
  const [isLiked, setIsLiked] = useState(isAlreadyLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  async function handleLikeTweet() {
    const likeResult = await likeTweet(tweetId);

    if (!likeResult.success) return;

    if (likeResult.type === "like") {
      setIsLiked(true);
      return setLikeCount((prevLikeCount) => ++prevLikeCount);
    }

    setIsLiked(false);
    setLikeCount((prevLikeCount) => --prevLikeCount);
  }

  return (
    <div
      className={`flex gap-1 flex-1 items-center duration-200 w-10 group ${
        isLiked ? "text-red-600" : "text-gray-500 hover:text-red-600"
      }`}
    >
      <button
        type="button"
        onClick={handleLikeTweet}
        className="rounded-full p-1 duration-200 group-hover:bg-red-950"
      >
        {isLiked ? (
          <HeartFilled height={24} width={24} />
        ) : (
          <HeartOutlined height={24} width={24} />
        )}
      </button>
      {!!likeCount && <p>{compactify(likeCount)}</p>}
    </div>
  );
}
