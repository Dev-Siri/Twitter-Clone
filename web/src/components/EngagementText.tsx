import { compactify } from "@/utils/formatting";
import Link from "next/link";

import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  metric: number;
  href: string;
}

export default function EngagementText({ children, metric, href }: Props) {
  return (
    !!metric && (
      <Link href={href}>
        <span className="font-bold">{compactify(metric)} </span>
        <span className="text-gray-600 dark:text-gray-400">{children}</span>
      </Link>
    )
  );
}
