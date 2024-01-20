import Image from "next/image";

import VerifiedIcon from "@/components/icons/Verified";
import twitterLogo from "./logo-img.avif";

export default function PreviewTweet() {
  return (
    <div
      role="presentation"
      className="flex border-2 select-none pointer-events-none rounded-xl w-fit p-3 border-gray-300 dark:border-gray-800"
    >
      <Image
        src={twitterLogo}
        alt="Twitter Logo"
        height={40}
        width={40}
        className="h-10 w-10 rounded-full"
      />
      <div className="ml-3">
        <section className="flex items-center">
          <p className="font-semibold">Twitter</p>
          <span
            aria-label="Verified Account"
            className="text-twitter-blue ml-1"
          >
            <VerifiedIcon height={20} width={20} />
          </span>
          <p className="text-gray-500 ml-1">@twitter · 1hr ago</p>
        </section>
        <p className="text-start">
          At the heart of Twitter are short messages called Tweets - just like
          this one - which can include photos, videos, links, text, hashtags,
          and mentions like <span className="text-twitter-blue">@twitter</span>
        </p>
      </div>
    </div>
  );
}
