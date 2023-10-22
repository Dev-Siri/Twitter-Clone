import getHighlightedTweetByUser from "@/actions/tweets/getHighlightedByUser";

import NoTweets from "@/components/NoTweets";
import Tweet from "@/components/Tweet";

interface Props {
  params: { tag: string };
}

export default async function Highlight({ params: { tag } }: Props) {
  const highlightedTweet = await getHighlightedTweetByUser({ tag });

  return highlightedTweet ? (
    <Tweet {...highlightedTweet} />
  ) : (
    <NoTweets
      tag={tag}
      title={`@${tag} does not have a highlighted tweet`}
      subtitle="When they do, it will show up here."
    />
  );
}
