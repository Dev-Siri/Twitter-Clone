import localFont from "next/font/local";
import "./globals.css";

import type { Metadata } from "next";
import type { PropsWithChildren, ReactNode } from "react";

import { env } from "@/env";

env.parse(process.env);

const chirp = localFont({
  src: [
    {
      path: "../../public/fonts/chirp-bold.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/chirp-medium.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/chirp-regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/chirp-extended-heavy.woff2",
      weight: "900",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Twitter. It's what's happening.",
  description:
    "From breaking news and entertainment to sports and politics, get the full story with all the live commentary.",
};

interface Props extends PropsWithChildren {
  flow: ReactNode;
}

export default function RootLayout({ children, flow }: Props) {
  return (
    <html lang="en" className={`bg-black text-white ${chirp.className}`}>
      <body className="flex scroll-smooth overflow-hidden">
        {children}
        {flow}
      </body>
    </html>
  );
}
