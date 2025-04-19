"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { DirectMessage } from "@/types";

import { useSession } from "@/hooks/useSession";

import getDmChannel, { dmEvents } from "@/pusher/channels/direct-message";
import pusherClient from "@/pusher/client";
import queryClient from "@/utils/query-client";
import { dmMessageSchema, type DmMessage } from "@/utils/validation/dm-message";

import EmojiPicker from "@/components/EmojiPicker";
import SendMessageIcon from "@/components/icons/SendMessage";
import Message from "./message";

interface Props extends DirectMessage {
  currentUser: NonNullable<ReturnType<typeof useSession>>;
}

export default function MainChat({
  currentUser,
  receiver,
  sender,
  dmId,
}: Props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<DmMessage[]>([]);

  const oppositeUser = useMemo(
    () => (currentUser.tag === sender.tag ? receiver : sender),
    [currentUser, receiver, sender]
  );

  useEffect(() => {
    async function fetchInitialMessages() {
      const response = await queryClient<DmMessage[]>(
        `/users/${receiver.tag}/dms/${dmId}/messages`
      );

      if (response.success) setMessages(response.data);
    }

    fetchInitialMessages();
  }, [dmId, receiver.tag]);

  useEffect(() => {
    const messagesChannel = pusherClient.subscribe(getDmChannel(dmId));

    function handleMessageCreate(data: unknown) {
      const validatedData = dmMessageSchema.safeParse(data);

      if (validatedData.success)
        setMessages((prevMessages) => [...prevMessages, validatedData.data]);
    }

    messagesChannel.bind(dmEvents.messageCreate, handleMessageCreate);

    return () => {
      messagesChannel.unbind(dmEvents.messageCreate, handleMessageCreate);
      messagesChannel.unsubscribe();
    };
  }, [dmId]);

  async function sendMessage() {
    const newDmMessage: Omit<DmMessage, "createdAt" | "messageId" | "dmId"> = {
      message,
      receiverTag: oppositeUser.tag,
      senderTag: currentUser.tag,
    };

    const response = await queryClient(
      `/users/${receiver.tag}/dms/${dmId}/messages`,
      {
        method: "POST",
        body: newDmMessage,
      }
    );

    if (response.success) setMessage("");
  }

  return (
    <>
      <div className="flex bg-gray-300 dark:bg-gray-900 absolute bottom-0 m-2 w-[46.5%] rounded-lg pr-10">
        <div className="flex flex-col h-full items-center justify-center pl-4 pt-1.5">
          <EmojiPicker
            pos={{ x: 0, y: -500 }}
            onEmojiClick={(emoji) =>
              setMessage((prevMessage) => `${prevMessage}${emoji}`)
            }
          />
        </div>
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
      <div className="flex flex-col p-4 gap-2">
        {messages.map((message) => (
          <Message
            key={message.messageId}
            {...message}
            oppositeUser={oppositeUser}
          />
        ))}
      </div>
    </>
  );
}
