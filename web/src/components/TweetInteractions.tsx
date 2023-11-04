import getIsTweetLiked from "@/actions/tweets/getIsLiked";
import getTweetLikes from "@/actions/tweets/getLikes";
import getTweetReplyCount from "@/actions/tweets/getReplyCount";

import LikeButton from "./LikeButton";
import Comment from "./icons/Comment";
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
  const [likeCount, isAlreadyLiked, replyCount] = await Promise.all([
    getTweetLikes(tweetId),
    getIsTweetLiked(tweetId),
    getTweetReplyCount(tweetId),
  ]);

  return (
    <div className={`flex ${layout === "page" && "justify-around"}`}>
      <div className="text-gray-500 flex items-center justify-center gap-2 cursor-pointer group duration-200 mr-10 hover:text-twitter-blue">
        <div className="duration-200 p-1 rounded-full group-hover:bg-twitter-blue group-hover:bg-opacity-30">
          <Comment height={24} width={24} />
        </div>
        {replyCount}
      </div>
      <LikeButton
        tweetId={tweetId}
        initialLikeCount={likeCount}
        isAlreadyLiked={isAlreadyLiked}
        likedIcon={<HeartFilled height={24} width={24} />}
        unlikedIcon={<HeartOutlined height={24} width={24} />}
      />
    </div>
  );
}
