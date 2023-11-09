"use server";
import { NeonDbError } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import jsonwebtoken from "jsonwebtoken";
import { cookies } from "next/headers";
import { ZodError } from "zod";

import type { Result } from "@/utils/validation/types";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { comparePassword } from "@/utils/hashing";
import { loginSchema } from "@/utils/validation/auth";
import formatSchemaErrors from "@/utils/validation/errors";

export default async function login(
  _: any,
  formData: FormData
): Promise<Result> {
  const data = Object.fromEntries(formData.entries());

  try {
    const { email, password } = loginSchema.parse(data);

    const [dbUser] = await db
      .select({
        userId: users.userId,
        name: users.name,
        userImage: users.userImage,
        birthday: users.birthday,
        tag: users.tag,
        password: users.password,
      })
      .from(users)
      .where(eq(users.email, email));

    if (!dbUser)
      return {
        success: false,
        message: "Account doesn't exist.",
      };

    const { password: hashedPassword, ...jwtUser } = dbUser;

    const isPasswordValid = await comparePassword(password, hashedPassword);

    if (!isPasswordValid)
      return {
        success: false,
        message: "Password is incorrect.",
      };

    const user = {
      ...jwtUser,
      email,
    };

    const authToken = jsonwebtoken.sign(user, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    cookies().set("auth_token", authToken);
    return { success: true };
  } catch (error) {
    if (error instanceof NeonDbError || error instanceof Error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    }

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
