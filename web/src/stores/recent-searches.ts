import { create } from "zustand";

import type { z } from "zod";

import { recentSearchesSchema } from "@/utils/validation/recent-searches";

export type RecentSearch = z.infer<typeof recentSearchesSchema>[number];

interface RecentSearchesStore {
  recentSearches: RecentSearch[];
  setRecentSearches(newSearches: RecentSearch[]): void;
}

const useRecentSearches = create<RecentSearchesStore>((set) => ({
  recentSearches: [],
  setRecentSearches: (newSearches: RecentSearch[]) =>
    set({ recentSearches: newSearches }),
}));

export default useRecentSearches;
