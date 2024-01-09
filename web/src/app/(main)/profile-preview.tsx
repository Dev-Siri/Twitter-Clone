import Image from "next/image";
import Link from "next/link";

import { useSession } from "@/hooks/useSession";

import ThreeDotsHorizontal from "@/components/icons/ThreeDotsHorizontal";
import UpMenu from "@/components/ui/UpMenu";

export default function ProfilePreview() {
  const user = useSession();

  if (!user) return null;

  return (
    <UpMenu
      pos={{ x: 80, y: -130 }}
      className="w-full"
      options={
        <Link
          href="/logout"
          className="font-semibold p-3 pl-7 w-max pr-20 -z-10 rounded-xl duration-200 hover:bg-gray-300 hover:dark:bg-slate-900 md:rounded-none"
        >
          Log out @{user.tag}
        </Link>
      }
    >
      <article className="flex gap-3 w-full items-center rounded-full duration-200 hover:bg-gray-300 hover:dark:bg-slate-900 p-2">
        <Image
          src={user.userImage}
          alt={user.name}
          height={44}
          width={44}
          priority
          className="h-11 w-11 rounded-full"
        />
        <section className="flex-col justify-center hidden text-start min-[1265px]:flex overflow-hidden">
          <p className="font-bold text-lg whitespace-nowrap overflow-hidden">
            {user.name}
          </p>
          <p className="text-sm text-gray-500 -mt-0.5 whitespace-nowrap overflow-hidden">
            @{user.tag}
          </p>
        </section>
        <section className="ml-auto mr-2 hidden min-[1265px]:block">
          <ThreeDotsHorizontal height={24} width={24} />
        </section>
      </article>
    </UpMenu>
  );
}
