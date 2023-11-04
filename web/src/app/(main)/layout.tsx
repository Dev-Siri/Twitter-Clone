import { Toaster } from "sonner";

import type { Metadata } from "next";
import type { PropsWithChildren, ReactNode } from "react";

import RecommendationView from "./recommendation-view";
import Sidebar from "./sidebar";

export const metadata: Metadata = {
  title: "Twitter",
  description: "It's what's happening",
};

interface Props extends PropsWithChildren {
  create: ReactNode;
  options: ReactNode;
}

export default function MainLayout({ children, create, options }: Props) {
  return (
    <>
      <Sidebar />
      <main className="h-screen w-full overflow-x-hidden overflow-auto min-[978px]:w-2/4">
        {children}
      </main>
      <RecommendationView />
      <Toaster position="bottom-center" richColors theme="dark" />
      {create}
      {options}
    </>
  );
}
