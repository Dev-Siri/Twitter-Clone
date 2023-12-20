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
  showType?: "hover" | "click";
  onHover?(): void | Promise<void>;
  options: ReactNode;
}

export default function UpMenu({
  children,
  options,
  onHover,
  showType = "click",
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showType === "click") {
      function listener(e: Event) {
        if (!menuRef?.current?.contains(e.target as Node)) setIsOpen(false);
      }

      document.addEventListener("click", listener);

      return () => document.removeEventListener("click", listener);
    }
  }, [showType]);

  function handleMenuClick(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    e.stopPropagation();

    if (showType === "hover") return;

    setIsOpen((prevIsOpen) => !prevIsOpen);
  }

  const handleHover = (type: "enter" | "leave") => () => {
    if (showType === "click") return;

    if (type === "enter") {
      onHover?.();
      return setIsOpen(true);
    }

    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef} style={{ all: "unset" }}>
      <button
        style={{
          all: "unset",
          cursor: "pointer",
        }}
        onClick={handleMenuClick}
        onMouseEnter={handleHover("enter")}
        onMouseLeave={handleHover("leave")}
      >
        {children}
      </button>
      {isOpen && (
        <div
          className="absolute translate-x-10 bottom-full flex flex-col w-fit h-fit justify-center items-center py-2 z-50 bg-black shadow-[0_0px_20px] shadow-gray-700 rounded-xl fade"
          onClick={() => setIsOpen(false)}
          onMouseEnter={handleHover("enter")}
          onMouseLeave={handleHover("leave")}
        >
          {options}
        </div>
      )}
    </div>
  );
}
