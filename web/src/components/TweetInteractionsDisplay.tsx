"use client";
import type { TweetEngagements } from "@/types";

import { compactify } from "@/utils/formatting";

import LikeButton from "./LikeButton";
import RetweetButton from "./RetweetButton";
import Comment from "./icons/Comment";

interface Props extends TweetEngagements {
  isAlreadyRetweeted: boolean;
  isAlreadyLiked: boolean;
  tweetId: string;
  layout?: "card" | "page";
}

export default function TweetInteractionsDisplay({
  likes,
  replies,
  retweets,
  tweetId,
  layout,
  isAlreadyRetweeted,
  isAlreadyLiked,
}: Props) {
  return (
    <div
      className={`flex ${
        layout === "card"
          ? "pr-[67px] gap-20"
          : // flex-row makes things work.
            // why? I have no idea.
            "flex-row justify-center gap-28"
      }`}
    >
      <div className="text-gray-500 w-10 flex items-center justify-center gap-1 cursor-pointer group duration-200 hover:text-twitter-blue">
        <div className="duration-200 p-1 rounded-full group-hover:bg-twitter-blue group-hover:bg-opacity-30">
          <Comment height={24} width={24} />
        </div>
        {!!replies && <p>{compactify(replies)}</p>}
      </div>
      <RetweetButton
        initialRetweetCount={retweets}
        isAlreadyRetweeted={isAlreadyRetweeted}
      />
      <LikeButton
        tweetId={tweetId}
        initialLikeCount={likes}
        isAlreadyLiked={isAlreadyLiked}
      />
    </div>
  );
}
