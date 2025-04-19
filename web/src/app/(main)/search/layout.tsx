import type { PropsWithChildren } from "react";

import SearchInput from "@/components/SearchInput";
import SearchOptions from "./search-options";

export default function Search({ children }: PropsWithChildren) {
  return (
    <>
      <header className="p-2">
        <SearchInput />
      </header>
      <SearchOptions />
      {children}
    </>
  );
}
