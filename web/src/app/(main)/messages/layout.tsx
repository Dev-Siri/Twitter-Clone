import Link from "next/link";
import { Suspense, type PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";

import ComposeMessageIcon from "@/components/icons/ComposeMessage";
import ErrorIcon from "@/components/icons/Error";
import Loading from "@/components/ui/Loading";
import Messages from "./messages";

export default function MessagesLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen w-full">
      <div className="w-2/5 border-r border-r-gray-300 dark:border-r-gray-800">
        <header className="flex items-center justify-between p-2 px-4">
          <h2 className="text-xl font-semibold">Messages</h2>
          <Link
            href="/messages/compose"
            className="rounded-full duration-200 dark:bg-really-dark p-2 hover:bg-gray-300 hover:dark:bg-really-dark"
          >
            <ComposeMessageIcon height={20} width={20} />
          </Link>
        </header>
        <ErrorBoundary
          fallback={
            <div className="flex text-red-500 flex-col items-center pt-20">
              <ErrorIcon height={24} width={24} />
              <p>Failed to load messages</p>
            </div>
          }
        >
          <Suspense
            fallback={
              <div className="flex justify-center pt-20">
                <Loading />
              </div>
            }
          >
            <Messages />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div className="w-3/5">{children}</div>
    </div>
  );
}
