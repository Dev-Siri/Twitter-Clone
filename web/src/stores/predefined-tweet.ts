import { create } from "zustand";

interface QuoteTweetStore {
  quotedTweetUrl: string | null;
  setQuotedTweetUrl: (newQtUrl: string | null) => void;
}

export const useQuotedTweetStore = create<QuoteTweetStore>((set) => ({
  quotedTweetUrl: null,
  setQuotedTweetUrl: (newQTUrl: string | null) =>
    set({ quotedTweetUrl: newQTUrl }),
}));
