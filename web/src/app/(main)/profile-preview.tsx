import Image from "next/image";
import Link from "next/link";

import ThreeDotsHorizontal from "@/components/icons/ThreeDotsHorizontal";
import UpMenu from "@/components/ui/UpMenu";
import { useSession } from "@/hooks/useSession";

export default function ProfilePreview() {
  const user = useSession();

  if (!user) return null;

  return (
    <UpMenu
      options={
        <Link
          href="/logout"
          className="font-semibold p-3 pl-7 pr-20 -z-10 rounded-xl duration-200 hover:bg-slate-900 md:rounded-none"
        >
          Log out @{user.tag}
        </Link>
      }
    >
      <article className="flex gap-3 items-center rounded-full duration-200 cursor-pointer hover:bg-gray-800 p-2">
        <Image
          src={user.userImage}
          alt={user.name}
          height={44}
          width={44}
          priority
          className="h-11 w-11 rounded-full"
        />
        <section className="flex-col justify-center hidden min-[978px]:flex">
          <p className="font-bold text-lg">{user.name}</p>
          <p className="text-sm text-gray-500 -mt-0.5">@{user.name}</p>
        </section>
        <section className="ml-auto mr-2 hidden min-[978px]:block">
          <ThreeDotsHorizontal height={24} width={24} />
        </section>
      </article>
    </UpMenu>
  );
}
