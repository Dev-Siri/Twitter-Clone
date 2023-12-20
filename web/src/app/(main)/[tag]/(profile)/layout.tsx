import { Suspense, type PropsWithChildren, type ReactNode } from "react";

import type { Metadata } from "next";

import getUser from "@/actions/users/getOne";

import Loading from "@/components/ui/Loading";
import ProfileInfo from "./profile-info";

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
