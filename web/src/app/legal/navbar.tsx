import type { ReactNode } from "react";

import Logo from "@/components/icons/Logo";

interface Props {
  title: string;
  links?: ReactNode;
}

export default function Navbar({ title, links }: Props) {
  return (
    <nav className="flex fixed z-10 bg-white items-center p-7 w-full">
      <Logo height={35} width={44} />
      <p className="ml-2 text-2xl font-bold">{title}</p>
      {links && (
        <section className="flex items-center ml-auto">{links}</section>
      )}
    </nav>
  );
}
