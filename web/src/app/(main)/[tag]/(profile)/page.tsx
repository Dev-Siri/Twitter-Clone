import getTweetsByUser from "@/actions/tweets/getByUser";
import getPinnedTweet from "@/actions/tweets/getPinned";

import LoadMoreTweets from "@/components/LoadMoreTweets";
import NoTweets from "@/components/NoTweets";
import Tweet from "@/components/Tweet";

interface Props {
  params: { tag: string };
}

export default async function Profile({ params: { tag } }: Props) {
  const [tweets, pinnedTweet] = await Promise.all([
    getTweetsByUser({ page: 1, tag }),
    getPinnedTweet(),
  ]);

  return !!tweets.length ? (
    <>
      {pinnedTweet && <Tweet {...pinnedTweet} pinned />}
      {tweets}
      <LoadMoreTweets fetcher={getTweetsByUser} fetcherParameters={{ tag }} />
    </>
  ) : (
    <NoTweets tag={tag} />
  );
}
