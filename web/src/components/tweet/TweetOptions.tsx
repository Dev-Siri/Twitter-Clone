"use client";
import { useRouter } from "next/navigation";

import queryClient from "@/utils/queryClient";
import Delete from "../icons/Delete";
import Highlight from "../icons/Highlight";
import Pin from "../icons/Pin";

interface Props {
  tweetId: string;
  currentUserId: string;
}

export default function TweetOptions({ tweetId, currentUserId }: Props) {
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
    const response = await queryClient(`/tweets/${tweetId}/pin`, {
      method: "PUT",
      searchParams: { userId: currentUserId },
    });

    if (response.success)
      return notifyAction("Tweet pinned to your profile", "success");

    notifyAction("Failed to pin Tweet to your profile", "error");
  }

  async function handleHighlightTweet() {
    const response = await queryClient(`/tweets/${tweetId}/highlight`, {
      method: "PUT",
      searchParams: { userId: currentUserId },
    });

    if (response.success)
      return notifyAction("Tweet highlighted on your profile", "success");

    notifyAction("Failed to highlight Tweet on your profile", "error");
  }

  return (
    <>
      <button
        type="button"
        className="flex w-full items-center gap-2 text-red-500 p-4 px-6 duration-200 hover:bg-gray-300 hover:dark:bg-really-dark"
        onClick={handleDeleteTweet}
      >
        <Delete height={20} width={20} /> Delete
      </button>
      <button
        type="button"
        className="flex w-full items-center gap-2 p-4 px-6 duration-200 hover:bg-gray-300 hover:dark:bg-really-dark"
        onClick={handlePinTweet}
      >
        <Pin height={20} width={20} /> Pin to your profile
      </button>
      <button
        type="button"
        className="flex w-full items-center gap-2 p-4 px-6 duration-200 hover:bg-gray-300 hover:dark:bg-really-dark"
        onClick={handleHighlightTweet}
      >
        <Highlight height={20} width={20} /> Highlight on your profile
      </button>
    </>
  );
}
