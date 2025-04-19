import { z } from "zod";

export const fileInput = z.union([
  z.null(),
  z.undefined(),
  z.instanceof(File).refine((file) => {
    if (file.name === "undefined") return true;

    return !!file.size;
  }),
]);
