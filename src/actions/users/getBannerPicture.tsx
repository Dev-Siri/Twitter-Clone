"use server";
import { eq } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

export default async function getBannerPicture(tag: string) {
  const [{ banner }] = await db
    .select({ banner: users.banner })
    .from(users)
    .where(eq(users.tag, tag));

  return banner as typeof banner | null;
}
