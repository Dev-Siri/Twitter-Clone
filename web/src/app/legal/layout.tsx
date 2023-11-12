import "./legal.css";

import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import Footer from "./footer";

export const metadata: Metadata = {
  title: "Twitter",
};

export default function LegalLayout({ children }: PropsWithChildren) {
  return (
    <div className="bg-white text-black w-full h-screen overflow-y-auto">
      {children}
      <Footer />
    </div>
  );
}
