import Link from "next/link";

import type { Metadata } from "next";

import Logo from "@/components/icons/Logo";

export const metadata: Metadata = {
  title: "Not Found / Twitter",
};

export default function NotFound() {
  return (
    <article className="flex flex-col h-screen w-screen items-center justify-center gap-4">
      <Logo height={50} width={58} />
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-4xl">Page Not Found</h2>
      <Link
        href="/"
        className="bg-twitter-blue p-3 font-bold rounded-full w-1/4 text-center"
      >
        Home
      </Link>
    </article>
  );
}
