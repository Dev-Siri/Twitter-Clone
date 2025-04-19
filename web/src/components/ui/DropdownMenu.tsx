"use client";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PropsWithChildren,
} from "react";
import ThreeDotsHorizontalIcon from "../icons/ThreeDotsHorizontal";

interface Props extends PropsWithChildren {
  label?: string;
}

export default function DropdownMenu({ children, label }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  function handleClick(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    e.preventDefault();
    e.stopPropagation();

    setIsOpen((prevIsOpen) => !prevIsOpen);
  }

  function handleMenuClick(
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) {
    e.preventDefault();
    setIsOpen(false);
  }

  useEffect(() => {
    function closeDropdownMenu(e: globalThis.MouseEvent) {
      if (!menuRef?.current?.contains(e.target as Node)) setIsOpen(false);
    }

    document.addEventListener("click", closeDropdownMenu);
    return () => document.removeEventListener("click", closeDropdownMenu);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        className="text-gray-500 p-1.5 rounded-full z-50 duration-200 hover:bg-blue-100 hover:dark:bg-blue-950 hover:text-twitter-blue"
        onClick={handleClick}
        aria-label={label}
      >
        <ThreeDotsHorizontalIcon height={20} width={20} />
      </button>
      {isOpen && (
        <div
          onClick={handleMenuClick}
          className="w-[352px] overflow-hidden absolute -translate-x-[95%] bg-white dark:bg-black shadow-[0_0px_20px] shadow-gray-700 rounded-xl z-50 cursor-default"
        >
          {children}
        </div>
      )}
    </div>
  );
}
