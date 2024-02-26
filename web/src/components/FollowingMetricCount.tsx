import Link from "next/link";

interface Props {
  tag: string;
  followers: number;
  following: number;
}

export default function FollowingMetricCount({
  tag,
  followers,
  following,
}: Props) {
  return (
    <div className="flex gap-5 items-center">
      <Link href={`/${tag}/following`} className="hover:underline">
        <span className="font-bold">{following} </span>
        <span className="text-gray-500">Following</span>
      </Link>
      <Link href={`/${tag}/followers`} className="hover:underline">
        <span className="font-bold">{followers} </span>
        <span className="text-gray-500">
          {followers === 1 ? "Follower" : "Followers"}
        </span>
      </Link>
    </div>
  );
}
