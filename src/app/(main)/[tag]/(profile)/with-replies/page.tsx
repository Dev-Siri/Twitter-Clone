import type { Metadata } from "next";

import getRepliesByUser from "@/actions/tweets/getRepliesByUser";
import getUser from "@/actions/users/getOne";

import LoadMoreTweets from "@/components/LoadMoreTweets";
import NoTweets from "@/components/NoTweets";

interface Props {
  params: { tag: string };
}

export async function generateMetadata({
  params: { tag },
}: Props): Promise<Metadata> {
  const user = await getUser(tag);

  if (!user) return { title: "Profile / Twitter" };

  return {
    title: `Tweets with replies by ${user.name} (@${tag}) / Twitter`,
  };
}

export default async function Replies({ params: { tag } }: Props) {
  const tweets = await getRepliesByUser({ page: 1, tag });

  return !!tweets.length ? (
    <>
      {tweets}
      <LoadMoreTweets fetcher={getRepliesByUser} fetcherParameters={{ tag }} />
    </>
  ) : (
    <NoTweets tag={tag} />
  );
}
