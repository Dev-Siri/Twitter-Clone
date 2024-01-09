import Link from "next/link";

import { useSession } from "@/hooks/useSession";

import ExploreFilled from "@/components/icons/ExploreFilled";
import ExploreOutlined from "@/components/icons/ExploreOutlined";
import HomeFilled from "@/components/icons/HomeFilled";
import HomeOutlined from "@/components/icons/HomeOutlined";
import Logo from "@/components/icons/Logo";
import ProfileFilled from "@/components/icons/ProfileFilled";
import ProfileOutlined from "@/components/icons/ProfileOutlined";
import TweetLeaf from "@/components/icons/TweetLeaf";
import MoreOptions from "./more-options";
import ProfilePreview from "./profile-preview";
import SidebarLink from "./sidebar-link";

export default function Sidebar() {
  const user = useSession();

  return (
    <aside className="flex flex-col min-[1265px]:w-[23%] p-4 min-[1265px]:pl-10 h-screen border-r border-r-gray-300 dark:border-r-slate-800">
      <Link
        href="/"
        className="rounded-full w-fit p-3 pl-2 duration-200 hover:bg-gray-300 hover:dark:bg-slate-800"
      >
        <Logo height={35} width={41} />
      </Link>
      <SidebarLink
        href="/"
        activeIcon={<HomeFilled />}
        inactiveIcon={<HomeOutlined />}
      >
        Home
      </SidebarLink>
      <SidebarLink
        href="/explore"
        activeIcon={<ExploreFilled />}
        inactiveIcon={<ExploreOutlined />}
      >
        Explore
      </SidebarLink>
      <SidebarLink
        href={`/${user?.tag}`}
        activeIcon={<ProfileFilled />}
        inactiveIcon={<ProfileOutlined />}
      >
        Profile
      </SidebarLink>
      <MoreOptions />
      <Link
        href="/compose/tweet"
        className="bg-twitter-blue text-white mt-2 p-3.5 font-bold rounded-full text-lg text-center duration-200 mb-auto w-fit hover:bg-darker-twitter-blue min-[1265px]:w-full"
      >
        <span className="block min-[1265px]:hidden">
          <TweetLeaf />
        </span>
        <span className="hidden min-[1265px]:block">Tweet</span>
      </Link>
      <ProfilePreview />
    </aside>
  );
}
