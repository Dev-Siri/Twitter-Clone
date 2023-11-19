import Link from "next/link";
import { Suspense, type ReactNode } from "react";

import { findTwitterUrls, getTwitterStatusUuid } from "@/utils/url";

import QuotedTweet from "./QuotedTweet";
import Loading from "./ui/Loading";

interface Props {
  children: string;
}

export default function TweetText({ children }: Props) {
  const words = children.split(/(\s+)/);

  const twitterQuotedUrls = findTwitterUrls(words);
  const quotedTweetId = getTwitterStatusUuid(twitterQuotedUrls?.[0] ?? "");

  const html: ReactNode = words
    .filter((word) => word !== twitterQuotedUrls?.[0])
    .map((word) => {
      if (word.startsWith("@"))
        return (
          <Link
            key={word}
            href={`/${word.replace("@", "")}`}
            className="text-twitter-blue hover:underline"
          >
            {word}
          </Link>
        );

      return word;
    });

  return (
    <>
      <p>{html}</p>
      {!!quotedTweetId && (
        <Suspense
          fallback={
            <div className="flex items-center justify-center border-2 border-slate-800 rounded-lg p-3 my-2">
              <Loading />
            </div>
          }
        >
          <QuotedTweet id={quotedTweetId} />{" "}
        </Suspense>
      )}
    </>
  );
}
