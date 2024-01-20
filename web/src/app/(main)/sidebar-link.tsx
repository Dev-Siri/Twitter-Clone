"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { PropsWithChildren, ReactNode } from "react";

interface Props extends PropsWithChildren {
  href: string;
  activeIcon: ReactNode;
  inactiveIcon: ReactNode;
  label?: string;
}

export default function SidebarLink({
  children,
  href,
  activeIcon,
  inactiveIcon,
  label,
}: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className="flex items-center gap-4 duration-200 hover:bg-gray-200 hover:dark:bg-slate-800 p-4 rounded-full w-fit min-[1265px]:pr-8"
    >
      <span aria-label={label}>{isActive ? activeIcon : inactiveIcon}</span>
      <span
        className={`text-xl hidden min-[1265px]:block ${
          isActive && "font-bold"
        }`}
      >
        {children}
      </span>
    </Link>
  );
}
