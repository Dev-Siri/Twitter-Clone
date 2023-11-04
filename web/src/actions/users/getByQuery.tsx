"use server";
import { like } from "drizzle-orm";

import type { FetchParameters } from "../types";

import { LIMIT } from "@/constants/fetch";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

import UserTile from "@/components/UserTile";

export default async function getUsersByQuery({
  page,
  query,
}: FetchParameters & { query: string }) {
  const fetchedUsers = await db
    .select({
      userId: users.userId,
      userImage: users.userImage,
      name: users.name,
      tag: users.tag,
      bio: users.bio,
    })
    .from(users)
    .limit(LIMIT)
    .offset((page - 1) * LIMIT)
    .where(like(users.name, `%${query}%`));

  return fetchedUsers.map((user) => <UserTile key={user.userId} {...user} />);
}
