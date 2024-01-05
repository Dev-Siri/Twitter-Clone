import { type ReactNode } from "react";

import { findTwitterUrls, getTwitterStatusUuid } from "@/utils/url";

import ButtonLink from "./ButtonLink";
import ProfilePreview from "./ProfilePreview";
import QuotedTweet from "./QuotedTweet";

interface Props {
  children: string;
}

export default function TweetText({ children }: Props) {
  const words = children.split(/(\s+)/);

  const twitterQuotedUrls = findTwitterUrls(words);
  const quotedTweetId = getTwitterStatusUuid(twitterQuotedUrls?.[0] ?? "");

  const html: ReactNode = words
    .filter((word) => word !== twitterQuotedUrls?.[0])
    .map((word, i) => {
      if (word.startsWith("@"))
        return (
          <ProfilePreview tag={word} key={`${word}-${i}_mention`}>
            <ButtonLink
              href={`/${word.replace("@", "")}`}
              className="text-twitter-blue hover:underline"
            >
              {word}
            </ButtonLink>
          </ProfilePreview>
        );

      return <span key={`${word}-${i}_text`}>{word}</span>;
    });

  return (
    <>
      {html}
      {!!quotedTweetId && <QuotedTweet id={quotedTweetId} />}
    </>
  );
}
