import type { Metadata } from "next";

import getTweetsWithMediaByUser from "@/actions/tweets/getWithMediaByUser";
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
    title: `Media tweets by ${user.name} (@${tag}) / Twitter`,
  };
}

export default async function Media({ params: { tag } }: Props) {
  const tweets = await getTweetsWithMediaByUser({ page: 1, tag });

  return !!tweets.length ? (
    <>
      {tweets}
      <LoadMoreTweets
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
