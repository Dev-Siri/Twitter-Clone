import { type ReactNode } from "react";

import { findTwitterUrls, getTwitterStatusUuid } from "@/utils/url";

import ButtonLink from "./ButtonLink";
import ProfilePreview from "./ProfilePreview";
import QuotedTweet from "./tweet/QuotedTweet";

interface Props {
  children: string;
}

export default function InteractiveText({ children }: Props) {
  const words = children.split(/(\s+)/);

  const twitterQuotedUrls = findTwitterUrls(words);
  const quotedTweetId = getTwitterStatusUuid(twitterQuotedUrls?.[0] ?? "");

  const html: ReactNode = words
    .filter((word) => word !== twitterQuotedUrls?.[0])
    .map((word, i) => {
      if (word.startsWith("@"))
        return (
          <ProfilePreview tag={word.slice(1)} key={`${word}-${i}_mention`}>
            <ButtonLink
              href={`/${word.replace("@", "")}`}
              className="text-twitter-blue hover:underline"
            >
              {word}
            </ButtonLink>
          </ProfilePreview>
        );

      return word;
    });

  return (
    <>
      {html}
      {!!quotedTweetId && <QuotedTweet id={quotedTweetId} />}
    </>
  );
}
