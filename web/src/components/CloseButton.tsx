"use client";
import { useRouter } from "next/navigation";

import type { PropsWithChildren } from "react";

import { useQuotedTweetStore } from "@/stores/predefined-tweet";

export default function CloseButton({ children }: PropsWithChildren) {
  const { setQuotedTweetUrl } = useQuotedTweetStore();
  const router = useRouter();

  function handleClose() {
    setQuotedTweetUrl(null);
    router.back();
  }

  return (
    <button
      className="p-2 rounded-full text-5xl duration-200 hover:bg-gray-300 hover:dark:bg-gray-900"
      onClick={handleClose}
    >
      {children}
    </button>
  );
}
