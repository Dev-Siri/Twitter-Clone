import { redirect } from "next/navigation";
import { Suspense } from "react";

import type { Metadata } from "next";

import { useSession } from "@/hooks/useSession";

import HeadTitle from "@/components/HeadTitle";
import Loading from "@/components/ui/Loading";
import BookmarksList from "./bookmarks-list";

export const metadata: Metadata = {
  title: "Bookmarks / Twitter",
};

export default async function Bookmarks() {
  const user = useSession();

  if (!user) redirect("/auth");

  return (
    <>
      <HeadTitle subtitle={`@${user.tag}`}>Bookmarks</HeadTitle>
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center mt-28">
            <Loading />
          </div>
        }
      >
        <BookmarksList />
      </Suspense>
    </>
  );
}
