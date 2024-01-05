import type { PropsWithChildren } from "react";

import CloseButton from "@/components/CloseButton";
import Close from "@/components/icons/Close";

export default function UserImagesLayout({ children }: PropsWithChildren) {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.9)] h-screen w-screen inset-0 z-50">
      <div className="p-4">
        <CloseButton>
          <Close height={24} width={24} />
        </CloseButton>
      </div>
      <div className="flex mt-10 items-center justify-center">{children}</div>
    </div>
  );
}
