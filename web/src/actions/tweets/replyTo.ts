"use server";
import type { Result } from "@/utils/validation/types";

export default async function replyToTweet(): Promise<Result> {
  return { success: true };
}
