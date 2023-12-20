"use client";
import { useState, type MouseEvent, type PropsWithChildren } from "react";
import ThreeDotsHorizontal from "../icons/ThreeDotsHorizontal";

export default function DropdownMenu({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    e.preventDefault();

    setIsOpen((prevIsOpen) => !prevIsOpen);
  }

  function handleMenuClick(
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) {
    e.preventDefault();
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        className="text-gray-500 p-1.5 rounded-full z-50 duration-200 hover:bg-blue-950 hover:text-twitter-blue"
        onClick={handleClick}
      >
        <ThreeDotsHorizontal height={20} width={20} />
      </button>
      {isOpen && (
        <div
          onClick={handleMenuClick}
          className="w-[352px] overflow-hidden absolute -translate-x-[95%] bg-black shadow-[0_0px_20px] shadow-gray-700 rounded-xl z-50 cursor-default"
        >
          {children}
        </div>
      )}
    </div>
  );
}
