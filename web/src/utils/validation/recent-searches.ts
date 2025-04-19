import { z } from "zod";

export const recentSearchesSchema = z.array(
  z.object({
    search: z.string(),
    id: z.string(),
  })
);
