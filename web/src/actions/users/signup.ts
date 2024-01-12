"use server";
import { cookies } from "next/headers";
import { ZodError } from "zod";

import type { Result } from "@/utils/validation/types";

import queryClient from "@/utils/queryClient";
import { signupSchema } from "@/utils/validation/auth";
import formatSchemaErrors from "@/utils/validation/errors";

export default async function signup(
  _: Result,
  formData: FormData
): Promise<Result> {
  const data = Object.fromEntries(formData.entries());

  try {
    const { birthYear, birthMonth, birthDay, ...userInfo } =
      signupSchema.parse(data);

    const response = await queryClient<string>("/users/signup", {
      method: "POST",
      body: {
        ...userInfo,
        birthday: new Date(
          `${birthDay} ${birthMonth}, ${birthYear}`
        ).toISOString(),
      },
    });

    if (!response.success) throw new Error(response.message);

    cookies().set("auth_token", response.data);
    return { success: true };
  } catch (error) {
    if (error instanceof Error)
      return {
        success: false,
        message: error.message,
      };

    if (error instanceof ZodError)
      return {
        success: false,
        errors: formatSchemaErrors(error),
      };

    return {
      success: false,
      message: "An unknown error occurred.",
    };
  }
}
