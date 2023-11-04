import Image from "next/image";
import Link from "next/link";

import type { User } from "@/db/schema";

type Props = Pick<User, "userId" | "userImage" | "name" | "tag" | "bio">;

export default function UserTile({ name, userImage, bio, tag }: Props) {
  return (
    <article className="duration-200 hover:bg-[#0f0f0f]">
      <Link href={`/${tag}`} className="flex gap-3 p-4">
        <Image
          src={userImage}
          alt={name}
          height={48}
          width={48}
          className="h-12 w-12 rounded-full"
        />
        <section>
          <h3 className="font-bold">{name}</h3>
          <p className="text-gray-500 text-sm">@{tag}</p>
          <p>{bio}</p>
        </section>
      </Link>
    </article>
  );
}
