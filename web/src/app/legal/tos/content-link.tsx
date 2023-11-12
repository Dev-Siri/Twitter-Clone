"use client";
import { useEffect, useMemo, useState, type PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  target: string;
}

export default function ContentLink({ children, target }: Props) {
  const [locationHash, setLocationHash] = useState("");

  useEffect(() => {
    // After initial SSR, set the state
    setLocationHash(location.hash);

    const hashChangeListener = () => setLocationHash(location.hash);

    window.addEventListener("hashchange", hashChangeListener);

    return () => window.addEventListener("hashchange", hashChangeListener);
  }, []);

  const isActive = useMemo(
    () => locationHash.slice(1) === target,
    [locationHash, target]
  );

  return (
    <a
      href={`/legal/tos#${target}`}
      className={`font-bold ${
        isActive
          ? "underline cursor-default"
          : "duration-200 hover:text-gray-700"
      }`}
    >
      {children}
    </a>
  );
}
