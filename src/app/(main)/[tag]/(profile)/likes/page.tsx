import type { Metadata } from "next";

import getTweetsByUserLikes from "@/actions/tweets/getByUserLikes";
import getUser from "@/actions/users/getOne";

interface Props {
  params: { tag: string };
}

export async function generateMetadata({
  params: { tag },
}: Props): Promise<Metadata> {
  const user = await getUser(tag);

  if (!user) return { title: "Profile / Twitter" };

  return {
    title: `Tweets liked by ${user.name} (@${tag}) / Twitter`,
  };
}

export default async function Likes({ params: { tag } }: Props) {
  const tweets = await getTweetsByUserLikes({ tag });

  return tweets;
}
