"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  href: string;
  queryString?: string;
}

export default function TabLink({ children, href, queryString = "" }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      className={`flex flex-col items-center text-center relative font-semibold w-full p-4 duration-200 hover:bg-gray-900 ${
        isActive ? "white" : "text-gray-500"
      }`}
      href={`${href}?${queryString}`}
    >
      {children}
      {isActive && (
        <div className="absolute h-1 w-1/2 bg-twitter-blue rounded-full bottom-0 mt-auto" />
      )}
    </Link>
  );
}
