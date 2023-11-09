"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

import type { FetchParameters } from "@/actions/types";

import useVisibility from "@/hooks/useVisibility";

import Loading from "@/components/ui/Loading";

interface Props<T> {
  fetcher(fetchParameters: FetchParameters & T): Promise<JSX.Element[]>;
  fetcherParameters?: T;
}

export default function LoadMore<T extends Record<string, any>>({
  fetcher,
  fetcherParameters,
}: Props<T>) {
  const [tweets, setTweets] = useState<ReactNode[]>([]);
  const [isLimitReached, setIsLimitReached] = useState(false);

  const loader = useRef<HTMLDivElement>(null);
  const page = useRef(1);

  const isLoaderVisible = useVisibility(loader.current);

  useEffect(() => {
    async function fetchMoreTweets() {
      page.current++;
      const tweets = await fetcher({
        page: page.current,
        ...((fetcherParameters ?? {}) as T),
      });

      if (tweets.length < 1) setIsLimitReached(true);

      setTweets((prevTweets) => [...prevTweets, ...tweets]);
    }

    fetchMoreTweets();
  }, [isLoaderVisible, fetcher, fetcherParameters]);

  return (
    <>
      {tweets}
      {!isLimitReached && (
        <div className="flex items-center justify-center p-4" ref={loader}>
          <Loading />
        </div>
      )}
    </>
  );
}
