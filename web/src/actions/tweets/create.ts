"use server";
import { NeonDbError } from "@neondatabase/serverless";
import { FirebaseError } from "firebase/app";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

import type { Result } from "@/utils/validation/types";

import { db } from "@/db/drizzle";
import { tweets } from "@/db/schema";
import { useSession } from "@/hooks/useSession";
import { uploadFile } from "@/utils/files";
import formatSchemaErrors from "@/utils/validation/errors";
import { tweetSchema } from "@/utils/validation/tweet";

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

    if (media && media.size > 0) mediaUrl = await uploadFile(media, "tweets");

    await db.insert(tweets).values({
      caption,
      media: mediaUrl,
      tweetId: crypto.randomUUID(),
      userId: user.userId,
      inReplyToTweetId: replyingTo || null,
    });

    revalidatePath("/");
    revalidatePath("/[tag]/status/[statusId]", "page");
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

    if (error instanceof FirebaseError)
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
