"use client";
import { useContext } from "react";
import ReactLoadingBar from "react-top-loading-bar";

import { LoadingContext } from "@/context/LoadingContext";

export default function LoadingBar() {
  const loadingBarRef = useContext(LoadingContext);

  return (
    <ReactLoadingBar
      color="#1d9bf0"
      containerStyle={{ position: "relative" }}
      height={5}
      ref={loadingBarRef}
    />
  );
}
