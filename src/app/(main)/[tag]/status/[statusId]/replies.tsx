import getTweetReplies from "@/actions/tweets/getReplies";

import LoadMoreTweets from "@/components/LoadMoreTweets";

interface Props {
  tweetId: string;
}

export default async function TweetReplies({ tweetId }: Props) {
  const replies = await getTweetReplies({ page: 1, tweetId });

  return (
    <>
      {replies}
      <LoadMoreTweets
        fetcher={getTweetReplies}
        fetcherParameters={{ tweetId }}
      />
    </>
  );
}
