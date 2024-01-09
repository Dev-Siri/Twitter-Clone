import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { User } from "@/types";

import { useSession } from "@/hooks/useSession";
import { getJoinedDate } from "@/utils/date";
import queryClient from "@/utils/queryClient";

import HeadTitle from "@/components/HeadTitle";
import Calendar from "@/components/icons/Calendar";
import LinkedWebsite from "@/components/icons/LinkedWebsite";
import LocationPin from "@/components/icons/LocationPin";
import TabLink from "@/components/TabLink";
import TweetText from "@/components/TweetText";

interface Props {
  userTag: string;
}

export default async function ProfileInfo({ userTag }: Props) {
  const user = await queryClient<
    Omit<User, "email" | "pinnedTweetId" | "highlightedTweetId">
  >(`/users/${userTag}`, {
    cache: "no-cache",
  });

  if (!user.success) {
    if (user.status === 404) notFound();

    throw new Error(user.message);
  }

  const loggedInUser = useSession();
  const tweetCountResponse = await queryClient("/tweets/count", {
    searchParams: { userId: user.data.userId },
  });

  const { name, userImage, tag, bio, banner, location, website, createdAt } =
    user.data;

  return (
    <>
      <HeadTitle
        subtitle={
          tweetCountResponse.success
            ? `${tweetCountResponse.data} tweets`
            : "Failed to get tweet count"
        }
        showBackButton
      >
        {name}
      </HeadTitle>
      <section className="relative h-48 bg-twitter-blue">
        {banner && (
          <Link href={`/${tag}/header-photo`}>
            <Image
              src={banner}
              alt={`${name}'s Banner`}
              height={192}
              width={500}
              className="h-full w-full object-cover"
            />
          </Link>
        )}
        <Link href={`/${tag}/photo`} className="group">
          <Image
            src={userImage}
            alt={name}
            height={130}
            width={130}
            // idk a better solution for responsive design, css is too hard man
            className="absolute rounded-full mt-[45%] min-[400px]:mt-[40%] min-[472px]:mt-[33%] min-[536px]:mt-[28%] min-[615px]:mt-[25%] min-[696px]:mt-[20%] min-[860px]:mt-[15%] ml-6 border-4 border-black duration-200 group-hover:opacity-95 min-[987px]:mt-[20%]"
          />
        </Link>
      </section>
      <section className="px-4 pt-4">
        {loggedInUser?.userId === user.data.userId && (
          <div className="flex justify-end">
            <Link
              href="/settings/profile"
              className="p-2 px-4 border border-gray-600 duration-200 rounded-full font-bold hover:bg-gray-900"
            >
              Edit profile
            </Link>
          </div>
        )}
        <h3 className="mt-8 font-bold text-2xl">{name}</h3>
        <h4 className="text-gray-500">@{tag}</h4>
        <div className="mt-3">
          <TweetText>{bio ?? ""}</TweetText>
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
      <section className="flex border-b border-b-gray-800 mt-2">
        <TabLink href={`/${tag}`}>Tweets</TabLink>
        <TabLink href={`/${tag}/with-replies`}>Replies</TabLink>
        <TabLink href={`/${tag}/highlight`}>Highlight</TabLink>
        <TabLink href={`/${tag}/media`}>Media</TabLink>
        <TabLink href={`/${tag}/likes`}>Likes</TabLink>
      </section>
    </>
  );
}
