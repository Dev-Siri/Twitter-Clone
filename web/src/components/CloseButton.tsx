"use client";
import { useRouter } from "next/navigation";

import type { PropsWithChildren } from "react";

export default function CloseButton({ children }: PropsWithChildren) {
  const router = useRouter();

  return (
    <button
      className="p-2 rounded-full text-5xl hover:bg-slate-800"
      onClick={router.back}
    >
      {children}
    </button>
  );
}
