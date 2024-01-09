import Link from "next/link";

import Display from "@/components/icons/Display";
import HorizontalThreeDots from "@/components/icons/HorizontalThreeDots";
import Settings from "@/components/icons/Settings";
import Accordion from "@/components/ui/Accordion";
import UpMenu from "@/components/ui/UpMenu";

export default function MoreOptions() {
  return (
    <UpMenu
      pos={{ x: 10, y: -80 }}
      closeOnClick={false}
      options={
        <div className="w-80">
          <Accordion trigger="Settings and Support">
            <Link
              href="/settings"
              className="flex font-semibold cursor-pointer p-3 w-full gap-2 -z-10 items-center rounded-xl duration-200 hover:bg-gray-300 hover:dark:bg-slate-900 md:rounded-none"
            >
              <Settings height={20} width={20} />
              <span className="text-sm">Settings and privacy</span>
            </Link>
            <Link
              href="/i/display"
              className="flex font-semibold cursor-pointer p-3 w-full gap-2 -z-10 items-center rounded-xl duration-200 hover:bg-gray-300 hover:dark:bg-slate-900 md:rounded-none"
            >
              <Display height={18} width={18} />
              <span className="text-sm">Display</span>
            </Link>
          </Accordion>
        </div>
      }
      className="flex items-center gap-4 duration-200 hover:bg-gray-200 hover:dark:bg-slate-800 p-4 rounded-full w-fit min-[1265px]:pr-8"
    >
      <HorizontalThreeDots height={24} width={24} />
      <span className="text-xl hidden min-[1265px]:block">More</span>
    </UpMenu>
  );
}
