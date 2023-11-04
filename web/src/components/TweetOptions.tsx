"use client";
import { useRouter } from "next/navigation";

import deleteTweet from "@/actions/tweets/delete";
import pinTweet from "@/actions/tweets/pin";

import highlightTweet from "@/actions/tweets/highlight";
import Delete from "./icons/Delete";
import Highlight from "./icons/Highlight";
import Pin from "./icons/Pin";

interface Props {
  tweetId: string;
}

export default function TweetOptions({ tweetId }: Props) {
  const router = useRouter();

  async function notifyAction(message: string) {
    const { toast } = await import("sonner");

    toast.success(message);
    router.refresh();
  }

  async function handleDeleteTweet() {
    await deleteTweet(tweetId);

    notifyAction("Your tweet was deleted");
  }

  async function handlePinTweet() {
    await pinTweet(tweetId);

    notifyAction("Tweet pinned to your profile");
  }

  async function handleHighlightTweet() {
    await highlightTweet(tweetId);

    notifyAction("Tweet highlighted on your profile");
  }

  return (
    <>
      <button
        type="button"
        className="flex w-full items-center gap-2 text-red-500 p-4 px-6 hover:bg-[#0f0f0f]"
        onClick={handleDeleteTweet}
      >
        <Delete height={20} width={20} /> Delete
      </button>
      <button
        type="button"
        className="flex w-full items-center gap-2 p-4 px-6 hover:bg-[#0f0f0f]"
        onClick={handlePinTweet}
      >
        <Pin height={20} width={20} /> Pin to your profile
      </button>
      <button
        type="button"
        className="flex w-full items-center gap-2 p-4 px-6 hover:bg-[#0f0f0f]"
        onClick={handleHighlightTweet}
      >
        <Highlight height={20} width={20} /> Highlight on your profile
      </button>
    </>
  );
}
