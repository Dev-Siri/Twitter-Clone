import Image from "next/image";
import { notFound } from "next/navigation";

import queryClient from "@/utils/queryClient";

interface Props {
  params: { tag: string };
}

export default async function Photo({ params }: Props) {
  const profilePictureResponse = await queryClient<string>(`/users/${params.tag}/profile-picture`, {
    cache: "no-cache"
  });

  if (!profilePictureResponse.success) {
    if (profilePictureResponse.status === 404) notFound();

    throw new Error(profilePictureResponse.message)
  }

  return (
    <Image
      src={profilePictureResponse.data}
      alt={`${params.tag}'s Avatar`}
      height={300}
      width={300}
      className="rounded-full"
    />
  );
}
