"use client";
import { usePathname } from "next/navigation";

import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  pathnameStartsWith: string;
}

export default function DontShowWhen({ children, pathnameStartsWith }: Props) {
  const currentPathname = usePathname();

  return currentPathname.startsWith(pathnameStartsWith) ? null : children;
}
