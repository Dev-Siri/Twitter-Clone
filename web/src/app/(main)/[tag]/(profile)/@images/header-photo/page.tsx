import Image from "next/image";
import { notFound } from "next/navigation";

import queryClient from "@/utils/queryClient";

interface Props {
  params: { tag: string };
}

export default async function HeaderPhoto({ params }: Props) {
  const bannerPictureResponse = await queryClient<string>(`/users/${params.tag}/banner`, {
    cache: "no-cache"
  });

  if (!bannerPictureResponse.success) {
    if (bannerPictureResponse.status === 404) notFound();

    throw new Error(bannerPictureResponse.message)
  }

  return (
    <Image
      src={bannerPictureResponse.data}
      alt={`${params.tag}'s Banner`}
      height={300}
      width={1000}
      className="h-[300px] object-cover w-full"
    />
  );
}
