import { z } from "zod";

import { MONTHS } from "@/constants/date";
import { isValidYear } from "../date";
import { fileInput } from "./helpers";

export const loginSchema = z.object({
  email: z.string().email("Invalid email."),
  password: z
    .string({ required_error: "Password is required." })
    .min(8, "Password must consist of atleast 8 characters."),
});

export const signupSchema = loginSchema.extend({
  name: z.string(),
  birthMonth: z.enum(MONTHS, { invalid_type_error: "Invalid month." }),
  birthYear: z.coerce.number().refine(isValidYear, "Invalid year."),
  birthDay: z.coerce.number({
    invalid_type_error: "Birth day needs to be a valid number.",
  }),
});

export const updateSchema = z.object({
  name: z.string(),
  bio: z.string(),
  location: z.string(),
  website: z.string(),
  banner: fileInput,
  userImage: fileInput,
});
