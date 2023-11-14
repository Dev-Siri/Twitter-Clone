"use client";
import { useRouter } from "next/navigation";

import pinTweet from "@/actions/tweets/pin";

import highlightTweet from "@/actions/tweets/highlight";
import queryClient from "@/utils/queryClient";
import Delete from "./icons/Delete";
import Highlight from "./icons/Highlight";
import Pin from "./icons/Pin";

interface Props {
  tweetId: string;
}

export default function TweetOptions({ tweetId }: Props) {
  const router = useRouter();

  async function notifyAction(message: string, type: "success" | "error") {
    const { toast } = await import("sonner");

    if (type === "error") return toast.error(message);

    toast.success(message);
    router.refresh();
  }

  async function handleDeleteTweet() {
    const response = await queryClient(`/tweets/${tweetId}`, {
      method: "DELETE",
    });

    if (response.success)
      return notifyAction("Your Tweet was deleted", "success");

    notifyAction("Failed to delete Tweet", "error");
  }

  async function handlePinTweet() {
    await pinTweet(tweetId);

    notifyAction("Tweet pinned to your profile", "success");
  }

  async function handleHighlightTweet() {
    await highlightTweet(tweetId);

    notifyAction("Tweet highlighted on your profile", "success");
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
