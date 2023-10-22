"use client";
import { useRouter } from "next/navigation";

import { useEffect, type ComponentProps, type ReactNode } from "react";

import CloseButton from "./CloseButton";
import Close from "./icons/Close";

interface Props extends ComponentProps<"dialog"> {
  title?: string;
  closeAction?: boolean;
  /** Only applies to the inner content, not the header */
  defaultPadding?: boolean;
  trailing?: ReactNode;
}

export default function Modal({
  title,
  closeAction = true,
  open = true,
  defaultPadding = true,
  className,
  trailing,
  ...props
}: Props) {
  const router = useRouter();

  useEffect(() => {
    function listener(e: KeyboardEvent) {
      if (e.key === "Escape") router.back();
    }

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [router]);

  return (
    open && (
      <div
        className="h-screen w-screen absolute bg-gray-600 bg-opacity-60"
        onClick={router.back}
      >
        <dialog
          open
          onClick={(e) => e.stopPropagation()}
          className={`bg-black text-white w-2/4 mt-[1%] rounded-lg z-50 ${
            defaultPadding && "p-4"
          } ${className}`}
          {...props}
        >
          <header
            className={`flex gap-2 items-center ${!defaultPadding && "p-4"}`}
          >
            {closeAction && (
              <CloseButton>
                <Close />
              </CloseButton>
            )}
            {title && <h3 className="text-xl font-bold">{title}</h3>}
            <div className="ml-auto">{trailing}</div>
          </header>
          <section className={defaultPadding ? "ml-2 mt-2" : ""}>
            {props.children}
          </section>
        </dialog>
      </div>
    )
  );
}
