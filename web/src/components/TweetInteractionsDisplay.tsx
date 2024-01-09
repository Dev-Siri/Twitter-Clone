"use client";
import type { TweetEngagements } from "@/types";
import { lazy, useMemo, useState } from "react";

import { compactify } from "@/utils/formatting";

import queryClient from "@/utils/queryClient";
import EngagementText from "./EngagementText";
import RetweetOptions from "./RetweetOptions";
import Comment from "./icons/Comment";
import Retweet from "./icons/Retweet";
import UpMenu from "./ui/UpMenu";

const HeartFilled = lazy(() => import("./icons/HeartFilled"));
const HeartOutlined = lazy(() => import("./icons/HeartOutlined"));

interface Props extends TweetEngagements {
  isAlreadyRetweeted: boolean;
  isAlreadyLiked: boolean;
  actualTweetofRetweetId: string;
  tweetId: string;
  userId: string;
  name: string;
  layout: "card" | "page";
}

export default function TweetInteractionsDisplay({
  name,
  likes,
  replies,
  userId,
  retweets,
  quoteTweets,
  actualTweetofRetweetId,
  tweetId,
  layout,
  isAlreadyRetweeted,
  isAlreadyLiked,
}: Props) {
  const [retweetCount, setRetweetCount] = useState(retweets);
  const [alreadyRetweeted, setAlreadyRetweeted] = useState(isAlreadyRetweeted);
  const [likeCount, setLikeCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(isAlreadyLiked);

  const retweetAndQuoteTweets = useMemo(
    () => retweetCount + quoteTweets,
    [retweetCount, quoteTweets]
  );
  const showSeparateEngagements = useMemo(
    () => layout === "page" && (!!retweetCount || !!quoteTweets || !!likes),
    [layout, retweetCount, quoteTweets, likes]
  );

  async function handleLikeTweet() {
    const likeResult = await queryClient(`/tweets/${tweetId}/like`, {
      method: "PATCH",
      searchParams: { userId },
    });

    setLikeCount((prevLikeCount) =>
      isLiked ? --prevLikeCount : ++prevLikeCount
    );
    setIsLiked((prevIsLiked) => !prevIsLiked);

    if (!likeResult.success) {
      setLikeCount((prevLikeCount) =>
        isLiked ? ++prevLikeCount : --prevLikeCount
      );
      setIsLiked((prevIsLiked) => !prevIsLiked);
    }
  }

  return (
    <div className="w-full">
      {showSeparateEngagements && (
        <div className="flex w-full gap-4 border-b pb-4 border-b-gray-300 dark:border-b-slate-800 pt-2">
          <EngagementText
            metric={retweetCount}
            href={`/${name}/status/${tweetId}/retweets`}
          >
            {retweetCount === 1 ? "Retweet" : "Retweets"}
          </EngagementText>
          <EngagementText
            metric={quoteTweets}
            href={`/${name}/status/${tweetId}/quotes`}
          >
            {quoteTweets === 1 ? "Quote Tweet" : "Quote Tweets"}
          </EngagementText>
          <EngagementText
            metric={likeCount}
            href={`/${name}/status/${tweetId}/likes`}
          >
            {likeCount === 1 ? "Like" : "Likes"}
          </EngagementText>
        </div>
      )}
      <div
        className={`flex ${
          layout === "card"
            ? "pr-[67px] gap-20"
            : `flex-row justify-center gap-28 pl-[23%] ${
                showSeparateEngagements && "pt-2"
              }`
        }`}
      >
        <div className="text-gray-500 w-10 flex items-center justify-center gap-1 cursor-pointer group duration-200 hover:text-twitter-blue">
          <div className="duration-200 p-1 rounded-full group-hover:bg-twitter-blue group-hover:bg-opacity-30">
            <Comment height={24} width={24} />
          </div>
          {!!replies && layout === "card" && <p>{compactify(replies)}</p>}
        </div>
        <UpMenu
          pos={{ x: -140, y: -35 }}
          options={
            <RetweetOptions
              name={name}
              layout={layout}
              userId={userId}
              tweetId={tweetId}
              actualTweetofRetweetId={actualTweetofRetweetId}
              isAlreadyRetweeted={isAlreadyRetweeted}
              setRetweetCount={setRetweetCount}
              setAlreadyRetweeted={setAlreadyRetweeted}
            />
          }
        >
          <div
            className={`text-gray-500 w-10 mt-2 flex items-center justify-center gap-1 cursor-pointer group duration-200 hover:text-twitter-blue ${
              alreadyRetweeted && "text-twitter-blue"
            }`}
          >
            <div className="duration-200 p-1 rounded-full group-hover:bg-twitter-blue group-hover:bg-opacity-30">
              <Retweet height={24} width={24} />
            </div>
            {!!retweetAndQuoteTweets && layout === "card" && (
              <p>{compactify(retweetAndQuoteTweets)}</p>
            )}
          </div>
        </UpMenu>
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
          {!!likeCount && layout === "card" && <p>{compactify(likeCount)}</p>}
        </div>
      </div>
    </div>
  );
}
