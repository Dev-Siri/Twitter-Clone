import { redirect } from "next/navigation";

import type { DirectMessage } from "@/types";

import { useSession } from "@/hooks/useSession";
import queryClient from "@/utils/queryClient";

import ErrorIcon from "@/components/icons/Error";
import MainChat from "./main-chat";

interface Props {
  params: { id: string };
}

export default async function Chat({ params: { id } }: Props) {
  const loggedInUser = useSession();

  if (!loggedInUser) redirect("/auth");

  const dmResponse = await queryClient<DirectMessage>(
    `/users/${loggedInUser.tag}/dms/${id}`
  );

  if (!dmResponse.success)
    return (
      <div className="h-full w-full flex flex-col items-center justify-center text-red-500">
        <ErrorIcon height={24} width={24} />
        <p>Failed to open messages</p>
      </div>
    );

  return (
    <>
      <header className="p-3">
        <h2 className="text-lg font-semibold">
          {dmResponse.data.receiver.name}
        </h2>
      </header>
      <MainChat {...dmResponse.data} currentUser={loggedInUser} />
    </>
  );
}
