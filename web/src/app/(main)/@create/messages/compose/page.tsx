import { redirect } from "next/navigation";

import { useSession } from "@/hooks/useSession";

import UserSelection from "./user-selection";

export default function ComposeMessage() {
  const user = useSession();

  if (!user) redirect("/auth");

  return <UserSelection loggedInUserTag={user.tag} />;
}
