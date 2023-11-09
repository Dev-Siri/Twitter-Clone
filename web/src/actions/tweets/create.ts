"use server";
import { NeonDbError } from "@neondatabase/serverless";
import { revalidatePath, revalidateTag } from "next/cache";
import { ZodError } from "zod";

import type { Result } from "@/utils/validation/types";

import { PLATFORM } from "@/constants/platform";
import { useSession } from "@/hooks/useSession";
import queryClient from "@/utils/queryClient";
import formatSchemaErrors from "@/utils/validation/errors";
import { tweetSchema } from "@/utils/validation/tweet";
import { encodeToBase64 } from "@/utils/encoding";

export default async function createTweet(
  _: any,
  formData: FormData
): Promise<Result> {
  const data = Object.fromEntries(formData.entries());

  try {
    const { caption, media, replyingTo } = tweetSchema.parse(data);

    const user = useSession();

    if (!user)
      return {
        success: false,
        message: "Not logged in.",
      };

    let mediaUrl: string | null = null;

    if (media && media.size > 0) mediaUrl = await encodeToBase64(media);

    const response = await queryClient("/tweets", {
      method: "POST",
      body: {
        caption,
        media: mediaUrl,
        userId: user.userId,
        inReplyToTweetId: replyingTo || null,
        platform: PLATFORM,
      },
    });

    if (!response.success) throw new Error(response.message);

    revalidateTag("home-tweets");
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
