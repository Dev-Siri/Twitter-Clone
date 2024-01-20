"use client";
import { useState, type PropsWithChildren } from "react";

import type { User } from "@/types";

import queryClient from "@/utils/queryClient";

import Image from "next/image";
import InteractiveText from "./InteractiveText";
import ErrorIcon from "./icons/Error";
import Loading from "./ui/Loading";
import UpMenu from "./ui/UpMenu";

interface Props extends PropsWithChildren {
  tag: string;
}

type ProfileLoadState = { status: number } & (
  | {
      state: "loading";
    }
  | {
      state: "error";
    }
  | {
      state: "success";
      data: Omit<User, "email" | "pinnedTweetId" | "highlightedTweetId">;
    }
);

export default function ProfilePreview({ children, tag }: Props) {
  const [profile, setProfile] = useState<ProfileLoadState>({
    state: "loading",
    status: 0,
  });

  async function fetchProfile() {
    const profileResponse = await queryClient<
      Omit<User, "email" | "pinnedTweetId" | "highlightedTweetId">
    >(`/users/${tag}`);

    if (!profileResponse.success)
      return setProfile({
        state: "error",
        status: profileResponse.status,
      });

    setProfile({
      state: "success",
      status: profileResponse.status,
      data: profileResponse.data,
    });
  }

  return (
    <UpMenu
      showType="hover"
      onHover={fetchProfile}
      pos={{ x: 0, y: 0 }}
      options={
        profile.status !== 404 && (
          <div className="p-4 w-80">
            {profile.state === "error" && (
              <div className="flex flex-col items-center justify-center text-red-500">
                <ErrorIcon height={24} width={24} />
                <p>Failed to load profile</p>
              </div>
            )}
            {profile.state === "loading" && (
              <div className="flex flex-col items-center justify-center">
                <Loading />
              </div>
            )}
            {profile.state === "success" && (
              <>
                <Image
                  src={profile.data.userImage}
                  alt={profile.data.name}
                  height={60}
                  width={60}
                  className="rounded-full"
                />
                <h3 className="font-bold text-xl mt-3">{profile.data.name}</h3>
                <p className="text-md text-gray-500">@{profile.data.tag}</p>
                <div className="mt-2">
                  <InteractiveText>{profile.data.bio ?? ""}</InteractiveText>
                </div>
              </>
            )}
          </div>
        )
      }
    >
      {children}
    </UpMenu>
  );
}
