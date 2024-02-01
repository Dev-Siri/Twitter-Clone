import Link from "next/link";

import queryClient from "@/utils/queryClient";

import ErrorIcon from "@/components/icons/Error";

interface Trend {
  term: string;
  tweets: number;
}

export default async function Trends() {
  const trendsResponse = await queryClient<Trend[]>("/trends", {
    baseUrl: process.env.NEXT_PUBLIC_ALGORITHMS_TRENDS_URL,
  });

  return (
    <div className="bg-gray-100 dark:bg-gray-900 rounded-xl">
      {!trendsResponse.success ? (
        <div className="flex flex-col items-center p-4 justify-center text-red-500">
          <ErrorIcon height={24} width={24} />
          <p>Failed to load trends.</p>
        </div>
      ) : (
        <>
          <h3 className="p-4 font-bold text-2xl">What&apos;s happening?</h3>
          {trendsResponse.data.slice(0, 4).map((trend, i) => (
            <Link
              href={`/search?q=${encodeURIComponent(trend.term)}`}
              key={i}
              className="cursor-pointer"
            >
              <div
                className={`duration-200 hover:bg-gray-200 hover:dark:bg-gray-800 p-4 ${
                  i + 1 === trendsResponse.data.slice(0, 4).length &&
                  "rounded-b-2xl"
                }`}
              >
                <p className="text-gray-400 text-sm">Trending</p>
                <p className="font-bold">{trend.term}</p>
                <p className="text-gray-400 text-sm">
                  {trend.tweets} {trend.tweets === 1 ? "Tweet" : "Tweets"}
                </p>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
}
