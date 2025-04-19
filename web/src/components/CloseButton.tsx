"use client";
import { useRouter } from "next/navigation";

import type { PropsWithChildren } from "react";

import { useQuotedTweetStore } from "@/stores/predefined-tweet";

interface Props extends PropsWithChildren {
  className?: string;
}

export default function CloseButton({ children, className }: Props) {
  const { setQuotedTweetUrl } = useQuotedTweetStore();
  const router = useRouter();

  function handleClose() {
    setQuotedTweetUrl(null);
    router.back();
  }

  return (
    <button
      className={`p-2 text-5xl duration-200 rounded-full ${
        className ?? "hover:bg-gray-300 hover:dark:bg-gray-900"
      }`}
      aria-label="Go back"
      onClick={handleClose}
    >
      {children}
    </button>
  );
}
