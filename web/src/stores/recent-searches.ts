import { create } from "zustand";

export interface RecentSearch {
  search: string;
  id: string;
}

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
