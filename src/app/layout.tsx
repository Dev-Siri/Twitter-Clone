import { Inter } from "next/font/google";
import "./globals.css";

import type { Metadata } from "next";
import type { PropsWithChildren, ReactNode } from "react";

import { env } from "@/env";

env.parse(process.env);

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en" className={`bg-black text-white ${inter.className}`}>
      <body className="flex overflow-hidden">
        {children}
        {flow}
      </body>
    </html>
  );
}
