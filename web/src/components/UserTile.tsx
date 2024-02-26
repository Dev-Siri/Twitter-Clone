import Image from "next/image";

import type { User } from "@/types";

import InteractiveText from "./InteractiveText";

interface Props extends Pick<User, "userImage" | "name" | "tag" | "bio"> {
  showBio?: boolean;
}

export default function UserTile({
  name,
  userImage,
  bio,
  tag,
  showBio = true,
}: Props) {
  return (
    <article className="flex gap-3 p-4 duration-200 hover:bg-gray-300 hover:dark:bg-[#0f0f0f]">
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
        {showBio && <InteractiveText>{bio ?? ""}</InteractiveText>}
      </section>
    </article>
  );
}
