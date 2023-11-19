"use client";
import { Dispatch, SetStateAction, useState } from "react";

import { compactify } from "@/utils/formatting";

import Retweet from "./icons/Retweet";
import UpMenu from "./ui/UpMenu";

interface Props {
  initialRetweetCount: number;
  isAlreadyRetweeted: boolean;
}

interface RetweetOptionsProps {
  setRetweetCount: Dispatch<SetStateAction<number>>;
  setAlreadyRetweeted: Dispatch<SetStateAction<boolean>>;
}

function RetweetOptions({
  setRetweetCount,
  setAlreadyRetweeted,
}: RetweetOptionsProps) {
  return (
    <>
      <button
        type="button"
        className="font-semibold p-3 w-fit -z-10 rounded-xl duration-200 hover:bg-slate-800 min-[978px]:pl-6 min-[978px]:w-full md:rounded-none"
      >
        <Retweet height={24} width={24} /> Retweet
      </button>
    </>
  );
}

export default function RetweetButton({
  initialRetweetCount,
  isAlreadyRetweeted,
}: Props) {
  const [retweetCount, setRetweetCount] = useState(initialRetweetCount);
  const [alreadyRetweeted, setAlreadyRetweeted] = useState(isAlreadyRetweeted);

  return (
    <UpMenu
      options={
        <RetweetOptions
          setRetweetCount={setRetweetCount}
          setAlreadyRetweeted={setAlreadyRetweeted}
        />
      }
    >
      <div
        className={`text-gray-500 w-10 flex items-center justify-center gap-1 cursor-pointer group duration-200 hover:text-twitter-blue ${
          alreadyRetweeted && "text-twitter-blue"
        }`}
      >
        <button
          type="button"
          className="duration-200 p-1 rounded-full group-hover:bg-twitter-blue group-hover:bg-opacity-30"
        >
          <Retweet height={24} width={24} />
        </button>
        {!!retweetCount && <p>{compactify(retweetCount)}</p>}
      </div>
    </UpMenu>
  );
}
