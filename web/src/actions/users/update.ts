"use server";
import { NeonDbError } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { ZodError } from "zod";

import type { Result } from "@/utils/validation/types";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { useSession } from "@/hooks/useSession";
import { uploadFile } from "@/utils/files";
import { updateSchema } from "@/utils/validation/auth";
import formatSchemaErrors from "@/utils/validation/errors";

export default async function updateUser(
  _: any,
  formData: FormData
): Promise<Result> {
  const data = Object.fromEntries(formData.entries());

  try {
    const { name, bio, location, website, banner, userImage } =
      updateSchema.parse(data);

    const updateObject: {
      name: string;
      bio: string | null;
      location: string | null;
      website: string | null;
      [key: string]: string | typeof banner;
    } = {
      name,
      bio: bio || null,
      location: location || null,
      website: website || null,
    };

    if (banner && banner.size > 0) {
      const uploadedBanner = await uploadFile(banner, "users");
      updateObject.banner = uploadedBanner;
    }

    if (userImage && userImage.size > 0) {
      const uploadedUserImage = await uploadFile(userImage, "users");
      updateObject.userImage = uploadedUserImage;
    }

    const user = useSession();

    if (!user)
      return {
        success: false,
        message: "Not logged in.",
      };

    await db
      .update(users)
      .set(updateObject)
      .where(eq(users.userId, user.userId));

    return { success: true };
  } catch (error) {
    if (error instanceof NeonDbError)
      return {
        success: false,
        message: error.message,
      };

    if (error instanceof ZodError)
      return {
        success: false,
        errors: formatSchemaErrors(error),
      };

    return {
      success: false,
      message: "An unknown error occurred.",
    };
  }
}
