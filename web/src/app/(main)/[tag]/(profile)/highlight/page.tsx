import type { ApiResponseTweet } from "@/types";

import queryClient from "@/utils/queryClient";

import NoTweets from "@/components/NoTweets";
import Tweet from "@/components/Tweet";
import Error from "@/components/icons/Error";

interface Props {
  params: { tag: string };
}

export default async function Highlight({ params: { tag } }: Props) {
  const highlightedTweetResponse = await queryClient<
    ApiResponseTweet<"platform">
  >(`/users/${tag}/tweets/highlighted`);

  return highlightedTweetResponse.success ? (
    <Tweet {...highlightedTweetResponse.data} />
  ) : highlightedTweetResponse.status === 404 ? (
    <NoTweets
      tag={tag}
      title={`@${tag} does not have a highlighted Tweet`}
      subtitle="When they do, it will show up here."
    />
  ) : (
    <div className="flex flex-col items-center justify-center p-10 text-red-500">
      <Error height={24} width={24} />
      <p>Failed to load highlighted Tweet</p>
    </div>
  );
}
