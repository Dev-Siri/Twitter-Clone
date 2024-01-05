"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

import type { FetchParameters } from "@/types";

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
  const [data, setData] = useState<ReactNode[]>([]);
  const [isLimitReached, setIsLimitReached] = useState(false);

  const loader = useRef<HTMLDivElement>(null);
  const page = useRef(1);

  const isLoaderVisible = useVisibility(loader.current);

  useEffect(() => {
    async function fetchMoreTweets() {
      page.current++;
      const data = await fetcher({
        page: page.current,
        ...((fetcherParameters ?? {}) as T),
      });

      if (data.length < 1) setIsLimitReached(true);

      setData((prevData) => [...prevData, ...data]);
    }

    fetchMoreTweets();
  }, [isLoaderVisible, fetcher, fetcherParameters]);

  return (
    <>
      {data}
      {!isLimitReached && (
        <div className="flex items-center justify-center p-4" ref={loader}>
          <Loading />
        </div>
      )}
    </>
  );
}
