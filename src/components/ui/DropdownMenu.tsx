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
        className="text-gray-500 p-1 rounded-full z-50 hover:bg-[#0f0f0f]"
        onClick={handleClick}
      >
        <ThreeDotsHorizontal />
      </button>
      {isOpen && (
        <div
          onClick={handleMenuClick}
          className="w-[400px] absolute -translate-x-48 bg-black border border-gray-800 rounded-md z-50 cursor-default"
        >
          {children}
        </div>
      )}
    </div>
  );
}
