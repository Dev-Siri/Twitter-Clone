import { Toaster } from "sonner";

import type { Metadata } from "next";
import type { PropsWithChildren, ReactNode } from "react";

import DontShowWhen from "@/components/DontShowWhen";
import LoadingContextProvider from "@/context/LoadingContext";
import Main from "./main";
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
      <Main>{children}</Main>
      <DontShowWhen pathnameStartsWith="/messages">
        <RecommendationView />
      </DontShowWhen>
      <Toaster position="bottom-center" richColors theme="dark" />
      {create}
      {options}
    </LoadingContextProvider>
  );
}
