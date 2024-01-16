"use client";
import SearchInput from "@/components/SearchInput";

import { usePathname } from "next/navigation";

export default function SearchRecommendationView() {
  const pathname = usePathname();

  return !pathname.includes("/search") && <SearchInput />;
}
