"use client";
import { useState, type ReactNode } from "react";

import likeTweet from "@/actions/tweets/like";
import { compactify } from "@/utils/formatting";

interface Props {
  tweetId: string;
  likedIcon: ReactNode;
  unlikedIcon: ReactNode;
  initialLikeCount: number;
  isAlreadyLiked: boolean;
}

export default function LikeButton({
  tweetId,
  initialLikeCount,
  likedIcon,
  unlikedIcon,
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
        {isLiked ? likedIcon : unlikedIcon}
      </button>
      {!!likeCount && <p>{compactify(likeCount)}</p>}
    </div>
  );
}
