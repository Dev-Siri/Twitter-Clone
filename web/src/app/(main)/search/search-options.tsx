"use client";
import { useSearchParams } from "next/navigation";

import TabLink from "@/components/TabLink";

export default function SearchOptions() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const qs = `q=${query}`;

  return (
    <section className="flex border-b border-b-gray-800">
      <TabLink href={`/search`} queryString={qs}>
        Top
      </TabLink>
      <TabLink href={`/search/latest`} queryString={qs}>
        Latest
      </TabLink>
      <TabLink href={`/search/people`} queryString={qs}>
        People
      </TabLink>
      <TabLink href={`/search/media`} queryString={qs}>
        Media
      </TabLink>
    </section>
  );
}
