// what's up menu?
"use client";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PropsWithChildren,
  type ReactNode,
} from "react";

interface Props extends PropsWithChildren {
  options: ReactNode;
}

export default function UpMenu({ children, options }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function listener(e: Event) {
      if (!menuRef?.current?.contains(e.target as Node)) setIsOpen(false);
    }

    document.addEventListener("click", listener);

    return () => document.removeEventListener("click", listener);
  }, []);

  function handleMenuClick(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    e.stopPropagation();
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }

  return (
    <div className="relative" ref={menuRef}>
      {isOpen && (
        <div className="fixed translate-x-10 flex flex-col h-fit w-fit justify-center items-center inset-0 z-50 bg-black shadow-[0_0px_20px] shadow-gray-700 rounded-xl fade min-[978px]:w-full min-[978px]:absolute min-[978px]:h-full min-[978px]:-translate-y-16">
          {options}
        </div>
      )}
      <button type="button" className="w-full" onClick={handleMenuClick}>
        {children}
      </button>
    </div>
  );
}
