import Link from "next/link";

import type { ReactNode } from "react";

interface Props {
  children: string;
}

export default function TweetText({ children }: Props) {
  const words = children.split(/(\s+)/);
  const html: ReactNode = words.map((word) => {
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

  return html;
}
