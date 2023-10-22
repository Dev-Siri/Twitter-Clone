import SearchInput from "@/components/SearchInput";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore / Twitter",
};

export default function Explore() {
  return (
    <>
      <header className="p-3">
        <SearchInput />
      </header>
      <section className="flex flex-col gap-2 h-5/6 items-center justify-center">
        <h1 className="text-5xl text-center font-semibold">Search Twitter</h1>
        <p className="text-gray-500 px-10 text-center text-xl [text-wrap:balance]">
          Explore the endless world of entertainment by typing in the search box
          above
        </p>
      </section>
    </>
  );
}
