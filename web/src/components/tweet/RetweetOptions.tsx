"use client";
import { useRouter } from "next/navigation";
import { type Dispatch, type SetStateAction } from "react";

import { PLATFORM } from "@/constants/platform";
import { useQuotedTweetStore } from "@/stores/predefined-tweet";
import queryClient from "@/utils/queryClient";

import Link from "next/link";
import QuoteIcon from "../icons/Quote";
import RetweetIcon from "../icons/Retweet";

interface Props {
  userId: string;
  name: string;
  tweetId: string;
  layout: "card" | "page";
  actualTweetofRetweetId: string;
  isAlreadyRetweeted: boolean;
  setRetweetCount: Dispatch<SetStateAction<number>>;
  setAlreadyRetweeted: Dispatch<SetStateAction<boolean>>;
}

export default function RetweetOptions({
  setRetweetCount,
  isAlreadyRetweeted,
  setAlreadyRetweeted,
  layout,
  name,
  userId,
  tweetId,
  actualTweetofRetweetId,
}: Props) {
  const { setQuotedTweetUrl } = useQuotedTweetStore();
  const router = useRouter();

  async function retweet() {
    if (isAlreadyRetweeted) {
      const response = await queryClient(`/tweets/${actualTweetofRetweetId}`, {
        method: "DELETE",
      });

      if (!response.success) return;

      setRetweetCount((prevRetweetCount) =>
        isAlreadyRetweeted ? --prevRetweetCount : ++prevRetweetCount
      );
      setAlreadyRetweeted(false);

      if (layout === "card") {
        router.refresh();
      } else {
        router.push(`/i/status/${tweetId}`);
      }

      return;
    }

    const response = await queryClient("/tweets", {
      method: "POST",
      body: {
        caption: `https://twitter-revived.vercel.app/${name}/status/${tweetId}`,
        userId,
        platform: PLATFORM,
      },
    });

    if (!response.success) return;

    setRetweetCount((prevRetweetCount) =>
      isAlreadyRetweeted ? --prevRetweetCount : ++prevRetweetCount
    );
    setAlreadyRetweeted(true);
    router.refresh();
  }

  return (
    <div className="w-44">
      <button
        type="button"
        className="font-semibold flex w-full items-center gap-3 pl-4 p-3 -z-10 duration-200 hover:bg-slate-900"
        onClick={retweet}
      >
        <RetweetIcon height={20} width={20} />{" "}
        {isAlreadyRetweeted ? "Undo retweet" : "Retweet"}
      </button>
      <Link
        href="/compose/tweet"
        className="font-semibold flex w-full items-center gap-3 pl-4 p-3 -z-10 duration-200 hover:bg-slate-900"
        onClick={() =>
          setTimeout(
            () =>
              setQuotedTweetUrl(
                `https://twitter-revived.vercel.app/${name}/status/${tweetId}`
              ),
            100
          )
        }
      >
        <QuoteIcon height={20} width={20} /> Quote Tweet
      </Link>
    </div>
  );
}
