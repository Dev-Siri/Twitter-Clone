import { notFound, redirect } from "next/navigation";

import getUser from "@/actions/users/getOne";
import { useSession } from "@/hooks/useSession";

import UpdateForm from "./update-form";

export default async function ProfileSettings() {
  const session = useSession();

  if (!session) redirect("/auth");

  const user = await getUser(session.tag);

  if (!user) notFound();

  return <UpdateForm {...user} />;
}
