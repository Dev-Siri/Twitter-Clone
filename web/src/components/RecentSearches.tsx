"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import useRecentSearches from "@/stores/recent-searches";
import { recentSearchesSchema } from "@/utils/validation/recent-searches";

import Close from "./icons/Close";
import ExploreFilled from "./icons/ExploreFilled";
import Loading from "./ui/Loading";

export default function RecentSearches() {
  const [isLoading, setIsLoading] = useState(true);
  const { recentSearches, setRecentSearches } = useRecentSearches();

  useEffect(() => {
    function fetchRecentSearches() {
      const recentSearches = localStorage.getItem("recent-searches");

      if (!recentSearches) return setIsLoading(false);

      const parsedRecentSearches = JSON.parse(recentSearches);
      const parsedSchema = recentSearchesSchema.safeParse(parsedRecentSearches);

      if (parsedSchema.success) setRecentSearches(parsedSchema.data);

      setIsLoading(false);
    }

    fetchRecentSearches();
  }, [setRecentSearches]);

  function clearAllSearches() {
    setRecentSearches([]);
    localStorage.setItem("recent-searches", "[]");
  }

  function removeOneSearch(id: string) {
    // filter out the one search with that id
    setRecentSearches(recentSearches.filter((item) => item.id !== id));
    localStorage.setItem("recent-searches", JSON.stringify(recentSearches));
  }

  return (
    <div className="bg-white dark:bg-black shadow-[0_0px_20px] shadow-gray-500 rounded-lg w-full">
      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <Loading />
        </div>
      ) : !recentSearches.length ? (
        <div className="flex justify-center pt-4 pb-8">
          <p className="text-gray-500 px-4 text-center [text-wrap:balance]">
            Try searching for people, lists, or keywords
          </p>
        </div>
      ) : (
        <>
          <section className="flex justify-between p-4">
            <h2 className="text-[22px] font-bold">Recent</h2>
            <button
              type="button"
              className="font-bold text-twitter-blue duration-200 rounded-full px-4 hover:bg-blue-950 hover:bg-opacity-40"
              onClick={clearAllSearches}
            >
              Clear all
            </button>
          </section>
          <section>
            {recentSearches.map(({ search, id }, i) => (
              <div
                key={id}
                className={`flex items-center p-4 duration-200 hover:bg-gray-300 hover:dark:bg-gray-900 hover:bg-opacity-70 cursor-pointer ${
                  i + 1 === recentSearches.length && "rounded-b-lg"
                }`}
              >
                <div className="px-3">
                  <ExploreFilled />
                </div>
                <Link
                  className="pl-2 w-full"
                  href={`/search?q=${encodeURIComponent(search)}`}
                >
                  {search.slice(0, 20)}
                </Link>
                <button
                  className="rounded-full p-1 duration-200 text-twitter-blue hover:bg-blue-950 hover:bg-opacity-60"
                  type="button"
                  onClick={() => removeOneSearch(id)}
                >
                  <Close height={20} width={20} />
                </button>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  );
}
