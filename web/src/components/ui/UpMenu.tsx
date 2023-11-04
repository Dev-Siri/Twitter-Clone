// what's up menu?
"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type PropsWithChildren } from "react";

interface Option {
  name: string;
  link: string;
}

interface Props extends PropsWithChildren {
  options: Option[];
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

  return (
    <div className="relative" ref={menuRef}>
      {isOpen && (
        <div className="fixed translate-x-10 translate-y-[80vh] flex flex-col h-fit w-fit justify-center items-center inset-0 z-50 bg-black border border-gray-800 rounded-lg min-[978px]:w-full min-[978px]:absolute min-[978px]:h-full min-[978px]:-translate-y-16">
          {options.map(({ name, link }) => (
            <Link
              key={name}
              href={link}
              className="font-semibold p-3 w-fit -z-10 duration-200 hover:bg-slate-800 min-[978px]:pl-6 min-[978px]:w-full"
            >
              {name}
            </Link>
          ))}
        </div>
      )}
      <button
        className="w-full"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prevIsOpen) => !prevIsOpen);
        }}
      >
        {children}
      </button>
    </div>
  );
}
