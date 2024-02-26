"use client";
import queryClient from "@/utils/queryClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  followerTag: string;
  followingTag: string;
  isAlreadyFollowing: boolean;
}

export default function FollowButton({
  followerTag,
  followingTag,
  isAlreadyFollowing,
}: Props) {
  const [isFollowing, setIsFollowing] = useState(isAlreadyFollowing);
  const [isHoveringButton, setIsHoveringButton] = useState(false);

  const router = useRouter();

  async function follow() {
    const response = await queryClient(`/users/${followingTag}/follow`, {
      method: "POST",
      searchParams: { follower: followerTag },
    });

    setIsFollowing((prevIsFollowing) => !prevIsFollowing);

    if (!response.success)
      return setIsFollowing((prevIsFollowing) => !prevIsFollowing);

    router.refresh();
  }

  return (
    <button
      type="button"
      className={`p-2 px-5 border duration-200 rounded-full font-bold ${
        isHoveringButton && isFollowing
          ? "border-red-500 text-red-500 hover:bg-red-900 hover:bg-opacity-20"
          : "border-gray-600 hover:bg-gray-900"
      }`}
      onClick={follow}
      onMouseEnter={() => setIsHoveringButton(true)}
      onMouseLeave={() => setIsHoveringButton(false)}
    >
      {isFollowing ? (isHoveringButton ? "Unfollow" : "Following") : "Follow"}
    </button>
  );
}
