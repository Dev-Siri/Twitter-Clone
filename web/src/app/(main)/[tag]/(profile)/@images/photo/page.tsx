import Image from "next/image";
import { notFound } from "next/navigation";

import getProfilePicture from "@/actions/users/getProfilePicture";

interface Props {
  params: { tag: string };
}

export default async function Photo({ params }: Props) {
  const profilePicture = await getProfilePicture(params.tag);

  if (!profilePicture) notFound();

  return (
    <Image
      src={profilePicture}
      alt={`${params.tag}'s Avatar`}
      height={300}
      width={300}
      className="rounded-full"
    />
  );
}
