"use server";
import { eq } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

export default async function getUser(tag: string) {
  const [user] = await db
    .select({
      userId: users.userId,
      name: users.name,
      userImage: users.userImage,
      bio: users.bio,
      banner: users.banner,
      location: users.location,
      tag: users.tag,
      website: users.website,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.tag, tag));
  return user as typeof user | null;
}
