import { z } from "zod";

export const env = z.object({
  NEXT_PUBLIC_BACKEND_URL: z.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof env> {}
  }
}
