import { lazy, type PropsWithChildren } from "react";

import ArrowBack from "./icons/ArrowBack";

const CloseButton = lazy(() => import("./CloseButton"));

interface Props extends PropsWithChildren {
  subtitle?: string;
  showBackButton?: boolean;
}

export default function HeadTitle({
  children,
  subtitle,
  showBackButton,
}: Props) {
  return (
    <header
      className={`flex gap-2 items-center border-b border-b-slate-800 p-4 ${
        (subtitle || showBackButton) && "py-2"
      }`}
    >
      {showBackButton && (
        <CloseButton>
          <ArrowBack height={20} width={20} />
        </CloseButton>
      )}
      <section>
        <p className="font-semibold text-xl">{children}</p>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </section>
    </header>
  );
}
