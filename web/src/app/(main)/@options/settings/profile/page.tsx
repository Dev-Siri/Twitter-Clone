import { notFound, redirect } from "next/navigation";

import type { User } from "@/types";

import { useSession } from "@/hooks/useSession";
import queryClient from "@/utils/queryClient";

import UpdateForm from "./update-form";

export default async function ProfileSettings() {
  const session = useSession();

  if (!session) redirect("/auth");

  const userResponse = await queryClient<
    Omit<User, "email" | "pinnedTweetId" | "highlightedTweetId">
  >(`/users/${session.tag}`);

  if (!userResponse.success) {
    if (userResponse.status === 404) notFound();

    throw new Error(userResponse.message);
  }

  return <UpdateForm {...userResponse.data} />;
}
