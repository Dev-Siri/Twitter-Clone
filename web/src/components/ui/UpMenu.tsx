// what's UpMenu?
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
  className?: string;
  pos: {
    x: number;
    y: number;
  };
  options: ReactNode;
}

export default function UpMenu({
  children,
  options,
  onHover,
  className,
  pos: { x, y },
  showType = "click",
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showType === "click") {
      function listener(e: globalThis.MouseEvent) {
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

    if (isOpen) setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={handleMenuClick}
        onMouseEnter={handleHover("enter")}
        onMouseLeave={handleHover("leave")}
        className={`${className} cursor-pointer`}
      >
        {children}
      </button>
      {isOpen && (
        <div
          style={{ translate: `${x}px ${y}px` }}
          className="absolute flex flex-col items-end py-2 z-50 bg-black shadow-[0_0px_20px] shadow-gray-700 rounded-xl fade"
          onClick={() => showType === "click" && setIsOpen(false)}
          onMouseEnter={handleHover("enter")}
          onMouseLeave={handleHover("leave")}
        >
          {options}
        </div>
      )}
    </div>
  );
}
