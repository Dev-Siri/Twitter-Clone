import Link from "next/link";

import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  href: string;
}

export default function ReferenceLink({ href, ...props }: Props) {
  if (href.startsWith("/"))
    return (
      <Link
        className="text-twitter-blue hover:underline"
        href={href}
        {...props}
      />
    );

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="text-twitter-blue hover:underline"
      href={href}
      {...props}
    />
  );
}
