import Image from "next/image";
import { Suspense } from "react";

import type { Metadata } from "next";

import getAllTweets from "@/actions/tweets/getAll";
import { useSession } from "@/hooks/useSession";

import CreateTweet from "@/components/CreateTweet";
import HeadTitle from "@/components/HeadTitle";
import LoadMoreTweets from "@/components/LoadMoreTweets";
import Loading from "@/components/ui/Loading";

export const metadata: Metadata = {
  title: "Home / Twitter",
};

async function Tweets() {
  const tweets = await getAllTweets({ page: 1 });

  return (
    <>
      {tweets}
      <LoadMoreTweets fetcher={getAllTweets} />
    </>
  );
}

export default function Home() {
  const user = useSession();

  return (
    <>
      <HeadTitle>Home</HeadTitle>
      {user && (
        <section className="flex p-4 gap-4 mt-2 border-b border-b-gray-800">
          <Image
            src={user.userImage}
            alt={user.name}
            height={44}
            width={44}
            className="h-11 w-11 rounded-full"
          />
          <CreateTweet />
        </section>
      )}
      <Suspense
        fallback={
          <div className="flex items-center justify-center p-4">
            <Loading />
          </div>
        }
      >
        <Tweets />
      </Suspense>
    </>
  );
}
