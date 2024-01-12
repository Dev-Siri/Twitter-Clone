"use server";
import { cookies } from "next/headers";
import { ZodError } from "zod";

import type { Result } from "@/utils/validation/types";

import { useSession } from "@/hooks/useSession";
import { encodeToBase64 } from "@/utils/encoding";
import queryClient from "@/utils/queryClient";
import { updateSchema } from "@/utils/validation/auth";
import formatSchemaErrors from "@/utils/validation/errors";

export default async function updateUser(
  _: Result,
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
      banner?: string;
      userImage?: string;
    } = {
      name,
      bio: bio || null,
      location: location || null,
      website: website || null,
    };

    if (banner && banner.size > 0) {
      const uploadedBanner = await encodeToBase64(banner);
      updateObject.banner = uploadedBanner;
    }

    if (userImage && userImage.size > 0) {
      const uploadedUserImage = await encodeToBase64(userImage);
      updateObject.userImage = uploadedUserImage;
    }

    const user = useSession();

    if (!user)
      return {
        success: false,
        message: "Not logged in.",
      };

    const updateUserResponse = await queryClient<string>(`/users/${user.tag}`, {
      method: "PUT",
      body: updateObject,
    });

    if (!updateUserResponse.success) return updateUserResponse;

    cookies().set("auth_token", updateUserResponse.data);

    return { success: true };
  } catch (error) {
    if (error instanceof ZodError)
      return {
        success: false,
        errors: formatSchemaErrors(error),
      };
    if (error instanceof Error)
      return {
        success: false,
        message: error.message,
      };

    return {
      success: false,
      message: "An unknown error occurred.",
    };
  }
}
