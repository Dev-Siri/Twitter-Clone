"use client";
import {
  RefObject,
  createContext,
  useRef,
  type PropsWithChildren,
} from "react";

import type { LoadingBarRef } from "react-top-loading-bar";

export const LoadingContext = createContext<RefObject<LoadingBarRef> | null>(
  null
);

export default function LoadingContextProvider({
  children,
}: PropsWithChildren) {
  const loadingBarRef = useRef<LoadingBarRef>(null);

  return (
    <LoadingContext.Provider value={loadingBarRef}>
      {children}
    </LoadingContext.Provider>
  );
}
