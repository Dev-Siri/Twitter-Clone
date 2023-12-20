import type { TweetEngagements } from "@/types";

import { useSession } from "@/hooks/useSession";
import queryClient from "@/utils/queryClient";

import Error from "./icons/Error";
import TweetInteractionsDisplay from "./TweetInteractionsDisplay";

interface Props {
  tweetId: string;
  actualTweetofRetweetId: string;
  /**
   * Note: This prop influences both the layout AND the behavior of the component.
   */
  layout: "card" | "page";
}

export default async function TweetInteractions(props: Props) {
  const user = useSession();

  if (!user) return;

  const [
    tweetEngagmentsResponse,
    alreadyRetweetedResponse,
    alreadyLikedResponse,
  ] = await Promise.all([
    queryClient<TweetEngagements>(`/tweets/${props.tweetId}/engagements`),
    queryClient<boolean>(
      `/tweets/${props.tweetId}/engagements/already-retweeted`,
      {
        searchParams: { userId: user.userId },
      }
    ),
    queryClient<boolean>(`/tweets/${props.tweetId}/engagements/already-liked`, {
      searchParams: { userId: user.userId },
    }),
  ]);

  if (
    !tweetEngagmentsResponse.success ||
    !alreadyLikedResponse.success ||
    !alreadyRetweetedResponse.success
  )
    return (
      <div className="flex justify-center items-center gap-1 text-red-500">
        <Error height={18} width={18} />
        <p>Failed to load engagements</p>
      </div>
    );

  return (
    <TweetInteractionsDisplay
      {...tweetEngagmentsResponse.data}
      {...props}
      userId={user.userId}
      name={user.name}
      isAlreadyLiked={alreadyLikedResponse.data}
      isAlreadyRetweeted={alreadyRetweetedResponse.data}
    />
  );
}
