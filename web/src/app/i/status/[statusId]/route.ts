import { redirect } from "next/navigation";

import type { ApiResponseTweet } from "@/types";

import queryClient from "@/utils/queryClient";

interface Params {
  params: {
    statusId: string;
  };
}

export async function GET(_: Request, { params: { statusId } }: Params) {
  const tweetResponse = await queryClient<ApiResponseTweet<"platform">>(
    `/tweets/${statusId}`,
    {
      cache: "no-store",
    }
  );

  if (!tweetResponse.success) {
    if (tweetResponse.status === 404) redirect("/");

    throw new Error(tweetResponse.message);
  }

  const { tag, tweetId } = tweetResponse.data;

  redirect(`/${tag}/status/${tweetId}`);
}
