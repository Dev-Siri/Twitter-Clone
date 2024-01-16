import { Suspense } from "react";

import Loading from "@/components/ui/Loading";
import Footer from "./footer";
import SearchRecommendationView from "./search-recommendation-view";
import Trends from "./trends";

export default function RecommendationView() {
  return (
    <section className="w-[33%] hidden border-l border-l-gray-300 dark:border-l-slate-800 px-6 pt-2 overflow-hidden min-[987px]:block">
      <SearchRecommendationView />
      <div className="mt-4">
        <Suspense
          fallback={
            <div className="bg-gray-300 dark:bg-gray-800 p-4 flex items-center justify-center rounded-xl">
              <Loading />
            </div>
          }
        >
          <Trends />
        </Suspense>
      </div>
      <Footer />
    </section>
  );
}
