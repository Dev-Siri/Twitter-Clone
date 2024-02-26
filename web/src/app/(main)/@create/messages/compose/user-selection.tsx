"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import type { User } from "@/types";

import { LIMIT } from "@/constants/fetch";
import queryClient from "@/utils/queryClient";

import Modal from "@/components/Modal";
import UserTile from "@/components/UserTile";
import ExploreOutlinedIcon from "@/components/icons/ExploreOutlined";

interface Props {
  loggedInUserTag: string;
}

type Person = Pick<User, "userId" | "userImage" | "name" | "tag" | "bio">;

export default function UserSelection({ loggedInUserTag }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<Person[]>([]);

  const router = useRouter();

  useEffect(() => {
    async function fetchPeople() {
      const usersResponse = await queryClient<Person[]>("/users/search", {
        searchParams: {
          page: 1,
          limit: LIMIT,
          q: encodeURIComponent(searchTerm),
        },
      });

      if (!usersResponse.success) return;

      setUsers(usersResponse.data);
    }

    fetchPeople();
  }, [searchTerm]);

  async function openDm(receiver: string) {
    const response = await queryClient(`/users/${receiver}/dms`, {
      method: "POST",
      searchParams: { sender: loggedInUserTag },
    });

    if (!response.success) return;

    router.refresh();
    router.back();
  }

  return (
    <Modal title="New message" defaultPadding={false}>
      <div className="flex items-center border-b border-b-gray-800 py-2 px-6 gap-4">
        <div className="text-twitter-blue">
          <ExploreOutlinedIcon height={20} width={20} />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search people"
          className="bg-transparent outline-none"
        />
      </div>
      <div className="pb-4">
        {users
          .filter((user) => user.tag !== loggedInUserTag)
          .map((user) => (
            <button
              type="button"
              className="text-start w-full"
              key={user.tag}
              onClick={() => openDm(user.tag)}
            >
              <UserTile {...user} showBio={false} />
            </button>
          ))}
      </div>
    </Modal>
  );
}
