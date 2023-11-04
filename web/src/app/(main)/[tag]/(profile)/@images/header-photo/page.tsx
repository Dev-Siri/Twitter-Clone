import Image from "next/image";
import { notFound } from "next/navigation";

import getBannerPicture from "@/actions/users/getBannerPicture";

interface Props {
  params: { tag: string };
}

export default async function HeaderPhoto({ params }: Props) {
  const bannerPicture = await getBannerPicture(params.tag);

  if (!bannerPicture) notFound();

  return (
    <Image
      src={bannerPicture}
      alt={`${params.tag}'s Banner`}
      height={300}
      width={1000}
      className="h-[300px] object-cover w-full"
    />
  );
}
