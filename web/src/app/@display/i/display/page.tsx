"use client";
import { useTheme } from "next-themes";

import Modal from "@/components/Modal";
import CheckMark from "./check-mark";
import PreviewTweet from "./preview-tweet";

export default function DisplaySettings() {
  const { theme, setTheme } = useTheme();

  return (
    <Modal closeAction={false}>
      <div className="flex flex-col items-center p-4 justify-center text-center">
        <h3 className="text-3xl font-bold">Customize for view</h3>
        <p className="text-gray-500 my-3">
          These settings affect all the Twitter accounts on this browser.
        </p>
        <div className="px-10">
          <PreviewTweet />
        </div>
        <p className="text-gray-400 font-bold mt-10 self-start">Background</p>
        <div className="flex w-full gap-2 mt-1 mb-6 rounded-2xl">
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={`flex items-center w-1/3 p-4 bg-white gap-5 rounded-md border-2 ${
              theme === "light" ? "border-twitter-blue" : "border-white"
            }`}
          >
            <CheckMark selected={theme === "light"} />
            <span className="font-bold text-black">Default</span>
          </button>
          <button
            type="button"
            onClick={() => setTheme("dim")}
            className={`flex items-center w-1/3 p-4 bg-dim-gray text-white gap-5 rounded-md border-2 ${
              theme === "dim" ? "border-twitter-blue" : "border-gray-800"
            }`}
          >
            <CheckMark selected={theme === "dim"} />
            <span className="font-bold">Dim</span>
          </button>
          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`flex items-center w-1/3 p-4 gap-5 rounded-md bg-black text-white border-2 ${
              theme === "dark" ? "border-twitter-blue" : "border-gray-800"
            }`}
          >
            <CheckMark selected={theme === "dark"} />
            <span className="font-bold">Lights out</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
