import type { User } from "@/db/schema";
import type { Metadata } from "next";

import getTweetsWithMediaByUser from "@/actions/tweets/getWithMediaByUser";
import queryClient from "@/utils/queryClient";

import LoadMore from "@/components/LoadMore";
import NoTweets from "@/components/NoTweets";

interface Props {
  params: { tag: string };
}

export async function generateMetadata({
  params: { tag },
}: Props): Promise<Metadata> {
  const userResponse = await queryClient<
    Omit<User, "email" | "pinnedTweetId" | "highlightedTweetId">
  >(`/users/${tag}`, {
    cache: "no-cache",
  });

  if (!userResponse.success) {
    if (userResponse.status === 404) return { title: "Profile / Twitter" };

    throw new Error(userResponse.message);
  }

  return {
    title: `Media tweets by ${userResponse.data.name} (@${tag}) / Twitter`,
  };
}

export default async function Media({ params: { tag } }: Props) {
  const tweets = await getTweetsWithMediaByUser({ page: 1, tag });

  return !!tweets.length ? (
    <>
      {tweets}
      <LoadMore
        fetcher={getTweetsWithMediaByUser}
        fetcherParameters={{ tag }}
      />
    </>
  ) : (
    <NoTweets
      title={`@${tag} hasn't liked any tweets`}
      subtitle="When they do, those tweets will show up here."
      tag={tag}
    />
  );
}
