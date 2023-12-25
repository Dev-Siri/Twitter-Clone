import type { User } from "@/types";
import type { Metadata } from "next";

import getTweetsByUserLikes from "@/actions/tweets/getByUserLikes";
import queryClient from "@/utils/queryClient";

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
    title: `Tweets liked by ${userResponse.data.name} (@${tag}) / Twitter`,
  };
}

export default async function Likes({ params: { tag } }: Props) {
  const tweets = await getTweetsByUserLikes({ tag });

  return tweets;
}
