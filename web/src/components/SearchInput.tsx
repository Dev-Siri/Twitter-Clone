"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

import useRecentSearches from "@/stores/recent-searches";

import ExploreOutlined from "./icons/ExploreOutlined";
import RecentSearches from "./RecentSearches";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isHoveringOverRecents, setIsHoveringOverRecents] = useState(false);
  const { recentSearches, setRecentSearches } = useRecentSearches();

  const router = useRouter();
  const pathname = usePathname();

  function search(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const encodedSearchTerm = encodeURIComponent(searchTerm);

    const alreadyHasSearch = recentSearches.some(
      (recentSearch) => recentSearch.search === searchTerm
    );

    if (!alreadyHasSearch) {
      const addedSearches = [
        ...recentSearches,
        {
          search: searchTerm,
          id: crypto.randomUUID(),
        },
      ];

      setRecentSearches(addedSearches);
      localStorage.setItem("recent-searches", JSON.stringify(addedSearches));
    }

    setIsInputFocused(false);
    setIsHoveringOverRecents(false);

    if (pathname.startsWith("/search"))
      return router.push(`${pathname}?q=${encodedSearchTerm}`);

    router.push(`/search?q=${encodedSearchTerm}`);
  }

  return (
    <div className="relative w-full">
      <form
        method="GET"
        action="/search"
        className={`flex rounded-full p-2.5 border ${
          isInputFocused
            ? "bg-black border-twitter-blue"
            : "bg-gray-800 border-transparent"
        } `}
        onSubmit={search}
      >
        <div
          className={`flex items-center px-2 ${
            isInputFocused ? "text-twitter-blue" : "text-gray-500"
          }`}
        >
          <ExploreOutlined height={20} width={20} />
        </div>
        <input
          type="search"
          name="q"
          className="bg-transparent w-full outline-none"
          placeholder="Search Twitter"
          value={searchTerm}
          autoComplete="off"
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => !isHoveringOverRecents && setIsInputFocused(false)}
        />
      </form>
      {isInputFocused && (
        <div
          className="absolute w-full z-50"
          onMouseEnter={() => setIsHoveringOverRecents(true)}
          onMouseLeave={() => setIsHoveringOverRecents(false)}
        >
          <RecentSearches />
        </div>
      )}
    </div>
  );
}
