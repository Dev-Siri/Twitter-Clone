import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { Metadata } from "next";
import type { PropsWithChildren, ReactNode } from "react";

import getCountOfTweetByUser from "@/actions/tweets/getCountByUser";
import getUser from "@/actions/users/getOne";
import { useSession } from "@/hooks/useSession";
import { getJoinedDate } from "@/utils/date";

import HeadTitle from "@/components/HeadTitle";
import Calendar from "@/components/icons/Calendar";
import LinkedWebsite from "@/components/icons/LinkedWebsite";
import LocationPin from "@/components/icons/LocationPin";
import TabLink from "@/components/TabLink";

interface Props extends PropsWithChildren {
  images: ReactNode;
  params: { tag: string };
}

export async function generateMetadata({
  params: { tag },
}: Props): Promise<Metadata> {
  const user = await getUser(tag);

  if (!user) return { title: "Profile / Twitter" };

  return {
    title: `${user.name} (@${tag}) / Twitter`,
  };
}

export default async function ProfileLayout({
  children,
  images,
  params,
}: Props) {
  const user = await getUser(params.tag);

  if (!user) notFound();

  const loggedInUser = useSession();
  const tweetCount = await getCountOfTweetByUser(user.userId);

  const { name, userImage, tag, bio, banner, location, website, createdAt } =
    user;

  return (
    <article>
      {images}
      <HeadTitle subtitle={`${tweetCount} tweets`} showBackButton>
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
            className="absolute rounded-full mt-[20%] ml-6 border-4 border-black duration-200 group-hover:opacity-95"
          />
        </Link>
      </section>
      <section className="px-4 pt-4">
        {loggedInUser?.userId === user.userId && (
          <div className="flex justify-end">
            <Link
              href="/settings/profile"
              className="p-2 px-4 border border-gray-600 duration-200 rounded-full font-bold hover:bg-gray-900"
            >
              Edit profile
            </Link>
          </div>
        )}
        <h3 className="mt-14 font-bold text-2xl">{name}</h3>
        <h4 className="text-gray-500">@{tag}</h4>
        <p className="mt-3">{bio}</p>
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
      <section>{children}</section>
    </article>
  );
}
