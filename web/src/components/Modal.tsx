"use client";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  type ComponentProps,
  type ReactNode,
} from "react";

import { useQuotedTweetStore } from "@/stores/predefined-tweet";

import CloseButton from "./CloseButton";
import CloseIcon from "./icons/Close";

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
  const { setQuotedTweetUrl } = useQuotedTweetStore();

  const handleModalClose = useCallback(() => {
    setQuotedTweetUrl(null);
    router.back();
  }, [router, setQuotedTweetUrl]);

  useEffect(() => {
    function listener(e: KeyboardEvent) {
      if (e.key === "Escape") handleModalClose();
    }

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [router, handleModalClose]);

  return (
    open && (
      <div
        className="h-screen w-screen absolute bg-gray-600 bg-opacity-60"
        onClick={handleModalClose}
      >
        <dialog
          open
          onClick={(e) => e.stopPropagation()}
          className={`bg-white text-black dark:bg-black dark:text-white h-full w-full mt-[1%] rounded-lg z-50 sm:h-fit sm:w-11/12 md:w-2/4 ${
            defaultPadding && "p-4"
          } ${className}`}
          {...props}
        >
          <header
            className={`flex gap-2 items-center ${!defaultPadding && "p-4"}`}
          >
            {closeAction && (
              <CloseButton>
                <CloseIcon height={24} width={24} />
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
