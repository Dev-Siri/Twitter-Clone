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
      className="p-2 rounded-full text-5xl hover:bg-slate-800"
      onClick={handleClose}
    >
      {children}
    </button>
  );
}
