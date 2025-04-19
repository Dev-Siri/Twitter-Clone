import { z } from "zod";

export const dmMessageSchema = z.object({
  messageId: z.string(),
  dmId: z.string(),
  senderTag: z.string(),
  receiverTag: z.string(),
  createdAt: z.string(),
  message: z.string(),
});

export type DmMessage = z.infer<typeof dmMessageSchema>;
