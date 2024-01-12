"use client";
import { useMemo, useState } from "react";

interface Props {
  isAlreadyFollowing: boolean;
}

export default function FollowButton({ isAlreadyFollowing }: Props) {
  const [isFollowing, setIsFollowing] = useState(isAlreadyFollowing);
  const normalText = useMemo(
    () => (isFollowing ? "Following" : "Follow"),
    [isFollowing]
  );

  const [followButtonText, setFollowButtonText] = useState<
    typeof normalText | "Unfollow"
  >(normalText);

  async function follow() {
    // ... do stuff

    setIsFollowing((prevIsFollowing) => !prevIsFollowing);
  }

  return (
    <button
      type="button"
      className={`p-2 px-5 border duration-200 rounded-full font-bold ${
        followButtonText === "Unfollow"
          ? "border-red-500 text-red-500 hover:bg-red-900 hover:bg-opacity-20"
          : "border-gray-600 hover:bg-gray-900"
      }`}
      onClick={follow}
      onMouseEnter={() => isFollowing && setFollowButtonText("Unfollow")}
      onMouseLeave={() => setFollowButtonText(normalText)}
    >
      {followButtonText}
    </button>
  );
}
