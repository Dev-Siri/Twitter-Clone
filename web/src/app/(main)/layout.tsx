import { Toaster } from "sonner";

import type { Metadata } from "next";
import type { PropsWithChildren, ReactNode } from "react";

import LoadingBar from "@/components/LoadingBar";
import LoadingContextProvider from "@/context/LoadingContext";
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
    <LoadingContextProvider>
      <Sidebar />
      <main className="h-screen w-full overflow-x-hidden overflow-auto min-[987px]:w-[66%] min-[1265px]:w-[44%]">
        <LoadingBar />
        {children}
      </main>
      <RecommendationView />
      <Toaster position="bottom-center" richColors theme="dark" />
      {create}
      {options}
    </LoadingContextProvider>
  );
}
