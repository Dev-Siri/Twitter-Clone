"use client";
import { usePathname } from "next/navigation";
import { useContext, type PropsWithChildren } from "react";
import LoadingBar from "react-top-loading-bar";

import { LoadingContext } from "@/context/LoadingContext";

export default function Main({ children }: PropsWithChildren) {
  const loadingBarRef = useContext(LoadingContext);
  const pathname = usePathname();

  return (
    <main
      className={`h-screen overflow-x-hidden overflow-auto w-full ${
        pathname.startsWith("/messages")
          ? "min-[1265px]:w-[77%]"
          : "min-[987px]:w-[66%] min-[1265px]:w-[44%]"
      }`}
    >
      <LoadingBar
        color="#1d9bf0"
        containerStyle={{ position: "relative" }}
        height={5}
        ref={loadingBarRef}
      />
      {children}
    </main>
  );
}
