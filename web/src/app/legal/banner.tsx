import Image from "next/image";

import type { PropsWithChildren } from "react";

import bannerImage from "./banner.jpg";

export default function Banner({ children }: PropsWithChildren) {
  return (
    <div className="relative mt-24">
      <p className="absolute p-40 pl-10 text-9xl font-extrabold">{children}</p>
      <Image
        src={bannerImage}
        alt="Banner Picture"
        height={1500}
        width={1500}
        className="h-[600px] w-full"
      />
    </div>
  );
}
