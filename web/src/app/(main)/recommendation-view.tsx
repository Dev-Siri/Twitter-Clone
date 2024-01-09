"use client";
import { usePathname } from "next/navigation";

import SearchInput from "@/components/SearchInput";

export default function RecommendationView() {
  const pathname = usePathname();

  return (
    <section className="w-[33%] hidden border-l border-l-gray-300 dark:border-l-slate-800 px-6 pt-2 min-[987px]:block">
      {!pathname.includes("/search") && <SearchInput />}
    </section>
  );
}
