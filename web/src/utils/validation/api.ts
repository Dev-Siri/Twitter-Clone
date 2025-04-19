import { z } from "zod";

export const apiResponseSchema = z.union([
  z.object({
    success: z.literal(true),
    status: z.number(),
    data: z.any(),
  }),
  z.object({
    success: z.literal(false),
    status: z.number(),
    message: z.string(),
  }),
]);
