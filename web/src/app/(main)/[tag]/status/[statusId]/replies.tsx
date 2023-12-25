import getTweetReplies from "@/actions/tweets/getReplies";

import LoadMore from "@/components/LoadMore";

interface Props {
  tweetId: string;
}

export default async function TweetReplies({ tweetId }: Props) {
  const replies = await getTweetReplies({ page: 1, tweetId });

  return (
    <>
      {replies}
      <LoadMore fetcher={getTweetReplies} fetcherParameters={{ tweetId }} />
    </>
  );
}
