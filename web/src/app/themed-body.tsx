"use client";
import { useTheme } from "next-themes";

import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  extraClassName?: string;
}

export default function ThemedBody({ children, extraClassName }: Props) {
  const { theme } = useTheme();

  return (
    <div
      className={`bg-white text-black ${
        theme === "dim" ? "dark:bg-dim-gray" : "dark:bg-black"
      } ${extraClassName}`}
    >
      {children}
    </div>
  );
}
