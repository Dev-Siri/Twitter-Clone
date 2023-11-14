import type { TweetEngagements } from "@/types";

import { useSession } from "@/hooks/useSession";
import { compactify } from "@/utils/formatting";
import queryClient from "@/utils/queryClient";

import LikeButton from "./LikeButton";
import Comment from "./icons/Comment";
import Error from "./icons/Error";
import HeartFilled from "./icons/HeartFilled";
import HeartOutlined from "./icons/HeartOutlined";

interface Props {
  tweetId: string;
  layout?: "card" | "page";
}

export default async function TweetInteractions({
  tweetId,
  layout = "card",
}: Props) {
  const user = useSession();

  if (!user) return;

  const [tweetEngagmentsResponse, alreadyLikedResponse] = await Promise.all([
    queryClient<TweetEngagements>(`/tweets/${tweetId}/engagements`),
    queryClient<boolean>(`/tweets/${tweetId}/engagements/already-liked`, {
      searchParams: { userId: user.userId },
    }),
  ]);

  if (!tweetEngagmentsResponse.success || !alreadyLikedResponse.success)
    return (
      <div className="flex justify-center items-center gap-1 text-red-500">
        <Error height={18} width={18} />
        <p>Failed to load engagements</p>
      </div>
    );

  const { likes, replies } = tweetEngagmentsResponse.data;

  return (
    <div
      className={`flex ${
        layout === "card" ? "pr-[67px] gap-20" : "justify-around"
      }`}
    >
      <div className="text-gray-500 w-10 flex items-center justify-center gap-1 cursor-pointer group duration-200 hover:text-twitter-blue">
        <div className="duration-200 p-1 rounded-full group-hover:bg-twitter-blue group-hover:bg-opacity-30">
          <Comment height={24} width={24} />
        </div>
        {!!replies && <p>{compactify(replies)}</p>}
      </div>
      <LikeButton
        tweetId={tweetId}
        initialLikeCount={likes}
        isAlreadyLiked={alreadyLikedResponse.data}
        likedIcon={<HeartFilled height={24} width={24} />}
        unlikedIcon={<HeartOutlined height={24} width={24} />}
      />
    </div>
  );
}
