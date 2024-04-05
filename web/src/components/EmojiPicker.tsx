"use client";
import { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

import UpMenu from "./ui/UpMenu";

import EmojiIcon from "@/components/icons/Emoji";

const ReactEmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
});

interface Props {
  onEmojiClick: (emoji: string) => void;
  pos: {
    x: number;
    y: number;
  };
}

export default function EmojiPicker({ onEmojiClick, pos }: Props) {
  const { theme } = useTheme();

  return (
    <UpMenu
      pos={pos}
      closeOnClick={false}
      options={
        <ReactEmojiPicker
          theme={theme === "dark" || theme === "dim" ? Theme.DARK : Theme.LIGHT}
          onEmojiClick={(e) => onEmojiClick(e.emoji)}
        />
      }
      className="p-1.5 text-twitter-blue rounded-full duration-200 hover:bg-blue-950"
    >
      <EmojiIcon height={20} width={20} />
    </UpMenu>
  );
}
