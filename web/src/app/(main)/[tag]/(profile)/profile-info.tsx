import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { User } from "@/types";

import { useSession } from "@/hooks/useSession";
import { getJoinedDate } from "@/utils/date";
import queryClient from "@/utils/queryClient";

import FollowButton from "@/components/FollowButton";
import FollowingMetricCount from "@/components/FollowingMetricCount";
import HeadTitle from "@/components/HeadTitle";
import InteractiveText from "@/components/InteractiveText";
import TabLink from "@/components/TabLink";
import Calendar from "@/components/icons/Calendar";
import Error from "@/components/icons/Error";
import LinkedWebsite from "@/components/icons/LinkedWebsite";
import LocationPin from "@/components/icons/LocationPin";

interface Props {
  userTag: string;
}

export default async function ProfileInfo({ userTag }: Props) {
  const [userResponse, followersResponse, followingResponse] =
    await Promise.all([
      queryClient<Omit<User, "email" | "pinnedTweetId">>(`/users/${userTag}`, {
        cache: "no-cache",
      }),
      queryClient<number>(`/users/${userTag}/followers/count`, {
        cache: "no-cache",
      }),
      queryClient<number>(`/users/${userTag}/following/count`, {
        cache: "no-cache",
      }),
    ]);

  if (!userResponse.success) {
    if (userResponse.status === 404) notFound();

    throw new globalThis.Error(userResponse.message);
  }

  const loggedInUser = useSession();
  const tweetCountResponse = await queryClient("/tweets/count", {
    searchParams: { userId: userResponse.data.userId },
  });

  const {
    name,
    userImage,
    tag,
    bio,
    banner,
    location,
    website,
    createdAt,
    highlightedTweetId,
  } = userResponse.data;

  return (
    <>
      <HeadTitle
        subtitle={
          tweetCountResponse.success
            ? `${tweetCountResponse.data} Tweets`
            : "Failed to get Tweet count"
        }
        showBackButton
      >
        {name}
      </HeadTitle>
      <section className="relative">
        {banner ? (
          <Link className="bg-twitter-blue" href={`/${tag}/header-photo`}>
            <Image
              src={banner}
              alt={`${name}'s Banner`}
              height={192}
              width={500}
              className="h-full w-full object-cover"
            />
          </Link>
        ) : (
          <div className="bg-twitter-blue h-44 w-full" />
        )}
        <Link
          href={`/${tag}/photo`}
          className="absolute inset-0 w-fit h-fit top-3/4 rounded-full ml-6 border-4 border-gray-300 dark:border-black duration-200 group-hover:opacity-95"
        >
          <Image
            src={userImage}
            alt={name}
            height={130}
            width={130}
            className="rounded-full"
          />
        </Link>
      </section>
      <section className="px-4 pt-4">
        <div className="flex justify-end">
          {loggedInUser?.userId === userResponse.data.userId ? (
            <Link
              href="/settings/profile"
              className="p-2 px-4 border border-gray-600 duration-200 rounded-full font-bold hover:bg-gray-900"
            >
              Edit profile
            </Link>
          ) : (
            <FollowButton
              isAlreadyFollowing={
                // TODO: ADD ACTUAL DYNAMIC VALUE
                true
              }
            />
          )}
        </div>
        <h3 className="mt-10 font-bold text-2xl">{name}</h3>
        <h4 className="text-gray-500">@{tag}</h4>
        <div className="mt-3">
          <InteractiveText>{bio ?? ""}</InteractiveText>
        </div>
      </section>
      <section className="flex gap-4 px-4 pt-4">
        {location && (
          <div className="flex items-center gap-1.5 text-gray-500">
            <LocationPin height={20} width={20} />
            <p>{location}</p>
          </div>
        )}
        {website && (
          <div className="flex items-center gap-1.5 text-gray-500">
            <LinkedWebsite height={20} width={20} />
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-twitter-blue"
            >
              {website.replace("https://", "").replace("http://", "")}
            </a>
          </div>
        )}
        {createdAt && (
          <div className="flex items-center gap-1.5 text-gray-500">
            <Calendar height={20} width={20} />
            <p>Joined {getJoinedDate(createdAt)}</p>
          </div>
        )}
      </section>
      <section className="px-4 pt-2">
        {!followersResponse.success || !followingResponse.success ? (
          <div className="flex text-red-500 items-center gap-1">
            <Error height={18} width={18} />
            <>Failed to get follower count</>
          </div>
        ) : (
          <FollowingMetricCount
            tag={tag}
            followers={followersResponse.data}
            following={followingResponse.data}
          />
        )}
      </section>
      <section className="flex border-b border-b-gray-300 dark:border-b-gray-800 mt-2">
        <TabLink href={`/${tag}`}>Tweets</TabLink>
        <TabLink href={`/${tag}/with-replies`}>Replies</TabLink>
        {highlightedTweetId && (
          <TabLink href={`/${tag}/highlights`}>Highlights</TabLink>
        )}
        <TabLink href={`/${tag}/media`}>Media</TabLink>
        <TabLink href={`/${tag}/likes`}>Likes</TabLink>
      </section>
    </>
  );
}
