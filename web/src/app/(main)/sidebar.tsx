import Link from "next/link";

import { useSession } from "@/hooks/useSession";

import BookmarkFilledIcon from "@/components/icons/BookmarkFilled";
import BookmarkOutlinedIcon from "@/components/icons/BookmarkOutlined";
import ExploreFilledIcon from "@/components/icons/ExploreFilled";
import ExploreOutlinedIcon from "@/components/icons/ExploreOutlined";
import HomeFilledIcon from "@/components/icons/HomeFilled";
import HomeOutlinedIcon from "@/components/icons/HomeOutlined";
import Logo from "@/components/icons/Logo";
import ProfileFilledIcon from "@/components/icons/ProfileFilled";
import ProfileOutlinedIcon from "@/components/icons/ProfileOutlined";
import TweetLeafIcon from "@/components/icons/TweetLeaf";
import MoreOptions from "./more-options";
import ProfilePreview from "./profile-preview";
import SidebarLink from "./sidebar-link";

export default function Sidebar() {
  const user = useSession();

  return (
    <aside className="flex flex-col min-[1265px]:w-[23%] p-4 min-[1265px]:pl-10 h-screen border-r border-r-gray-300 dark:border-r-slate-800">
      <Link
        href="/"
        aria-label="Twitter"
        className="rounded-full w-fit p-3 pl-2 duration-200 hover:bg-gray-300 hover:dark:bg-slate-800"
      >
        <Logo height={35} width={41} />
      </Link>
      <SidebarLink
        href="/"
        label="Home"
        activeIcon={<HomeFilledIcon height={24} width={24} />}
        inactiveIcon={<HomeOutlinedIcon height={24} width={24} />}
      >
        Home
      </SidebarLink>
      <SidebarLink
        href="/explore"
        label="Explore"
        activeIcon={<ExploreFilledIcon height={24} width={24} />}
        inactiveIcon={<ExploreOutlinedIcon height={24} width={24} />}
      >
        Explore
      </SidebarLink>
      <SidebarLink
        href="/i/bookmarks"
        label="Bookmarks"
        activeIcon={<BookmarkFilledIcon height={24} width={24} />}
        inactiveIcon={<BookmarkOutlinedIcon height={24} width={24} />}
      >
        Bookmarks
      </SidebarLink>
      <SidebarLink
        href={`/${user?.tag}`}
        label="Profile"
        activeIcon={<ProfileFilledIcon height={24} width={24} />}
        inactiveIcon={<ProfileOutlinedIcon height={24} width={24} />}
      >
        Profile
      </SidebarLink>
      <MoreOptions />
      <Link
        href="/compose/tweet"
        className="bg-twitter-blue text-white mt-2 p-3.5 font-bold rounded-full text-lg text-center duration-200 mb-auto w-fit hover:bg-darker-twitter-blue min-[1265px]:w-full"
      >
        <span className="block min-[1265px]:hidden" aria-label="Compose Tweet">
          <TweetLeafIcon height={24} width={24} />
        </span>
        <span className="hidden min-[1265px]:block">Tweet</span>
      </Link>
      <ProfilePreview />
    </aside>
  );
}
