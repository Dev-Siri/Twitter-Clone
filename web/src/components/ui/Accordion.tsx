"use client";
import { useState, type PropsWithChildren } from "react";

import AccordionChevron from "../icons/AccordianChevron";

interface Props extends PropsWithChildren {
  trigger: string;
}

export default function Accordion({ trigger, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <details>
      <summary
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
        className="flex font-semibold cursor-pointer justify-between p-4 w-full -z-10 rounded-xl duration-200 hover:bg-gray-300 hover:dark:bg-slate-900 md:rounded-none"
      >
        {trigger}
        <span
          className={`duration-200 ${
            isOpen ? "text-twitter-blue -rotate-180" : "dark:text-white"
          }`}
        >
          <AccordionChevron height={24} width={24} />
        </span>
      </summary>
      {children}
    </details>
  );
}
