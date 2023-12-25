import { Suspense, type PropsWithChildren, type ReactNode } from "react";

import type { User } from "@/types";
import type { Metadata } from "next";

import queryClient from "@/utils/queryClient";

import Loading from "@/components/ui/Loading";
import ProfileInfo from "./profile-info";

interface Props extends PropsWithChildren {
  images: ReactNode;
  params: { tag: string };
}

export async function generateMetadata({
  params: { tag },
}: Props): Promise<Metadata> {
  const userResponse = await queryClient<
    Omit<User, "email" | "pinnedTweetId" | "highlightedTweetId">
  >(`/users/${tag}`, {
    cache: "no-cache",
  });

  if (!userResponse.success) {
    if (userResponse.status === 404) return { title: "Profile / Twitter" };

    throw new Error(userResponse.message);
  }

  return {
    title: `${userResponse.data.name} (@${tag}) / Twitter`,
  };
}

export default function ProfileLayout({ children, images, params }: Props) {
  return (
    <article>
      {images}
      <Suspense
        fallback={
          <div className="flex flex-col justify-center items-center">
            <Loading />
          </div>
        }
      >
        <ProfileInfo userTag={params.tag} />
      </Suspense>
      <section>{children}</section>
    </article>
  );
}
