"use server";
import { eq } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

export default async function getProfilePicture(tag: string) {
  const [{ userImage }] = await db
    .select({ userImage: users.userImage })
    .from(users)
    .where(eq(users.tag, tag));

  return userImage as typeof userImage | null;
}
