import Link from "next/link";
import { redirect } from "next/navigation";

import type { DirectMessage } from "@/types";

import UserTile from "@/components/UserTile";
import { useSession } from "@/hooks/useSession";
import queryClient from "@/utils/queryClient";

export default async function Messages() {
  const user = useSession();

  if (!user) redirect("/auth");

  const dmsResponse = await queryClient<DirectMessage[]>(
    `/users/${user.tag}/dms`,
    { cache: "no-cache" }
  );

  if (!dmsResponse.success) {
    if (dmsResponse.status === 404)
      return (
        <div className="px-8 pt-10">
          <h3 className="text-4xl font-bold">Welcome to your inbox!</h3>
          <p className="mt-2 mb-10 text-gray-500">
            Drop a line, share Tweets and more with private conversations
            between you and others on Twitter.
          </p>
          <Link
            href="/messages/compose"
            className="bg-twitter-blue hover:bg-darker-twitter-blue duration-200 text-white rounded-full font-bold text-lg px-8 p-4"
          >
            Write a message
          </Link>
        </div>
      );

    throw new Error(dmsResponse.message);
  }

  return (
    <>
      {dmsResponse.data.map((dm) => (
        <Link key={dm.dmId} href={`/messages/${dm.dmId}`}>
          <UserTile {...dm.receiver} showBio={false} />
        </Link>
      ))}
    </>
  );
}
