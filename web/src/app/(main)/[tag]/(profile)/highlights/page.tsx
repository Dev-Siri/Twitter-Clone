import { redirect } from "next/navigation";

import type { ApiResponseTweet } from "@/types";

import queryClient from "@/utils/queryClient";

import Error from "@/components/icons/Error";
import TweetCard from "@/components/tweet/TweetCard";

interface Props {
  params: { tag: string };
}

export default async function Highlight({ params: { tag } }: Props) {
  const highlightedTweetResponse = await queryClient<
    ApiResponseTweet<"platform">
  >(`/users/${tag}/tweets/highlighted`);

  if (!highlightedTweetResponse.success) {
    if (highlightedTweetResponse.status === 404) redirect(`/${tag}`);

    return (
      <div className="flex flex-col items-center justify-center p-10 text-red-500">
        <Error height={24} width={24} />
        <p>Failed to load highlighted Tweet</p>
      </div>
    );
  }

  return <TweetCard {...highlightedTweetResponse.data} />;
}
