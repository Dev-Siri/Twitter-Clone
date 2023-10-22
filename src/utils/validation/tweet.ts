import { z } from "zod";

import { fileInput } from "./helpers";

export const tweetSchema = z.object({
  caption: z.string().max(280, "Tweet too long."),
  replyingTo: z.string().nullish(),
  media: fileInput,
});
