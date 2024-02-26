"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { DirectMessage } from "@/types";

import { useSession } from "@/hooks/useSession";

import SendMessageIcon from "@/components/icons/SendMessage";

interface Props extends DirectMessage {
  currentUser: NonNullable<ReturnType<typeof useSession>>;
}

export default function MainChat({ currentUser, receiver, sender }: Props) {
  const [message, setMessage] = useState("");

  const oppositeUser = useMemo(
    () => (currentUser.tag === sender.tag ? receiver : sender),
    [currentUser, receiver, sender]
  );

  async function sendMessage() {}

  return (
    <>
      <div className="flex bg-gray-300 dark:bg-gray-900 absolute bottom-0 m-2 w-[46.5%] rounded-lg pr-10">
        <input
          type="text"
          name="message"
          placeholder="Start a new message"
          className="p-3 w-full bg-transparent rounded-lg outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="button"
          aria-label="Send message"
          onClick={sendMessage}
          className="text-twitter-blue duration-200 p-3 rounded-full hover:text-darker-twitter-blue"
        >
          <SendMessageIcon height={20} width={20} />
        </button>
      </div>
      <Link
        href={`/${oppositeUser.tag}`}
        className="flex flex-col items-center justify-center w-full duration-200 p-4 border-b border-b-gray-200 dark:border-b-gray-800 hover:bg-gray-300 hover:dark:bg-gray-900"
      >
        <Image
          src={oppositeUser.userImage}
          alt={`${oppositeUser.name} (@${oppositeUser.tag})`}
          height={70}
          width={70}
          className="rounded-full"
        />
        <span className="text-xl font-semibold mt-3">{oppositeUser.name}</span>
        <span className="text-base text-gray-500">@{oppositeUser.tag}</span>
      </Link>
    </>
  );
}
