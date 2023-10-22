"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

import ExploreOutlined from "./icons/ExploreOutlined";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [searchTerm, setSearchTerm] = useState(initialQuery);

  const router = useRouter();
  const pathname = usePathname();

  function search(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (pathname.startsWith("/search"))
      return router.push(`${pathname}?q=${searchTerm}`);

    router.push(`/search?q=${searchTerm}`);
  }

  return (
    <form
      method="GET"
      action="/search"
      className="flex rounded-full bg-gray-800 p-2.5 focus:bg-twitter-blue"
      onSubmit={search}
    >
      <div className="flex items-center text-gray-500 px-2">
        <ExploreOutlined height={20} width={20} />
      </div>
      <input
        type="search"
        name="q"
        className="bg-transparent outline-none"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
}
