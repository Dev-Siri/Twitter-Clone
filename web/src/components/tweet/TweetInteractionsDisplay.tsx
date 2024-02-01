"use client";
import type { TweetEngagements } from "@/types";
import { lazy, useMemo, useState } from "react";

import { compactify } from "@/utils/formatting";

import queryClient from "@/utils/queryClient";
import EngagementText from "../EngagementText";
import BookmarkFilledIcon from "../icons/BookmarkFilled";
import BookmarkOutlinedIcon from "../icons/BookmarkOutlined";
import CommentIcon from "../icons/Comment";
import RetweetIcon from "../icons/Retweet";
import UpMenu from "../ui/UpMenu";
import RetweetOptions from "./RetweetOptions";

const HeartFilledIcon = lazy(() => import("../icons/HeartFilled"));
const HeartOutlinedIcon = lazy(() => import("../icons/HeartOutlined"));

interface Props extends TweetEngagements {
  isAlreadyRetweeted: boolean;
  isAlreadyLiked: boolean;
  isAlreadyBookmarked: boolean;
  actualTweetofRetweetId: string;
  tag: string;
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
  bookmarks,
  tag,
  actualTweetofRetweetId,
  tweetId,
  layout,
  isAlreadyRetweeted,
  isAlreadyLiked,
  isAlreadyBookmarked,
}: Props) {
  const [retweetCount, setRetweetCount] = useState(retweets);
  const [alreadyRetweeted, setAlreadyRetweeted] = useState(isAlreadyRetweeted);
  const [likeCount, setLikeCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(isAlreadyLiked);
  const [bookmarkCount, setBookmarkCount] = useState(bookmarks);
  const [isBookmarked, setIsBookmarked] = useState(isAlreadyBookmarked);

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

  async function handleBookmarkTweet() {
    const bookmarkResult = await queryClient(`/tweets/${tweetId}/bookmark`, {
      method: "POST",
      searchParams: { tag },
    });

    setBookmarkCount((prevBookmarkCount) =>
      isBookmarked ? --prevBookmarkCount : ++prevBookmarkCount
    );
    setIsBookmarked((prevIsBookmarked) => !prevIsBookmarked);

    if (!bookmarkResult.success) {
      setBookmarkCount((prevBookmarkCount) =>
        isBookmarked ? ++prevBookmarkCount : --prevBookmarkCount
      );
      setIsBookmarked((prevIsBookmarked) => !prevIsBookmarked);
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
          <EngagementText metric={bookmarkCount}>
            {bookmarkCount === 1 ? "Bookmark" : "Bookmarks"}
          </EngagementText>
        </div>
      )}
      <div
        className={`flex ${
          layout === "card"
            ? "pr-[67px] gap-20"
            : `flex-row justify-center gap-28 pl-[4%] ${
                showSeparateEngagements && "pt-2"
              }`
        }`}
      >
        <div className="text-gray-500 w-10 flex items-center justify-center gap-1 cursor-pointer group duration-200 hover:text-twitter-blue">
          <div className="duration-200 p-1 rounded-full group-hover:bg-twitter-blue group-hover:bg-opacity-30">
            <CommentIcon height={24} width={24} />
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
            aria-label="Retweet"
            className={`text-gray-500 w-10 mt-2 flex items-center justify-center gap-1 cursor-pointer group duration-200 hover:text-twitter-blue ${
              alreadyRetweeted && "text-twitter-blue"
            }`}
          >
            <div className="duration-200 p-1 rounded-full group-hover:bg-twitter-blue group-hover:bg-opacity-30">
              <RetweetIcon height={24} width={24} />
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
            aria-label={isLiked ? "Unlike" : "Like"}
          >
            {isLiked ? (
              <HeartFilledIcon height={24} width={24} />
            ) : (
              <HeartOutlinedIcon height={24} width={24} />
            )}
          </button>
          {!!likeCount && layout === "card" && <p>{compactify(likeCount)}</p>}
        </div>
        <div
          className={`flex gap-1 flex-1 items-center duration-200 w-10 group ${
            isBookmarked
              ? "text-twitter-blue"
              : "text-gray-500 hover:text-twitter-blue"
          }`}
        >
          <button
            type="button"
            onClick={handleBookmarkTweet}
            className="rounded-full p-1 duration-200 group-hover:bg-twitter-blue group-hover:bg-opacity-30"
            aria-label={
              isBookmarked ? "Remove from bookmarks" : "Bookmark Tweet"
            }
          >
            {isBookmarked ? (
              <BookmarkFilledIcon height={24} width={24} />
            ) : (
              <BookmarkOutlinedIcon height={24} width={24} />
            )}
          </button>
          {!!bookmarkCount && layout === "card" && (
            <p>{compactify(bookmarkCount)}</p>
          )}
        </div>
      </div>
    </div>
  );
}
