"use server";
import { NeonDbError } from "@neondatabase/serverless";
import { sql } from "drizzle-orm";
import jsonwebtoken from "jsonwebtoken";
import { cookies } from "next/headers";
import { ZodError } from "zod";

import type { Result } from "@/utils/validation/types";

import { DEFAULT_PFP } from "@/constants/urls";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { tagify } from "@/utils/formatting";
import { hashPassword } from "@/utils/hashing";
import { signupSchema } from "@/utils/validation/auth";
import formatSchemaErrors from "@/utils/validation/errors";

export default async function signup(
  _: any,
  formData: FormData
): Promise<Result> {
  const data = Object.fromEntries(formData.entries());

  try {
    const signupValidationResult = signupSchema.parse(data);

    const userRows = await db
      .select({ count: sql<number>`count(*)` })
      .from(users);

    if (userRows[0].count > 0)
      return {
        success: false,
        message: "Account already exists.",
      };

    const { password, birthYear, birthMonth, birthDay, ...userInfo } =
      signupValidationResult;

    const user = {
      ...userInfo,
      userId: crypto.randomUUID(),
      tag: tagify(userInfo.name),
      userImage: DEFAULT_PFP,
      birthday: `${birthYear}-${birthMonth}-${birthDay}`,
    };

    const hashedPassword = await hashPassword(password);

    await db.insert(users).values({
      ...user,
      password: hashedPassword,
    });

    const authToken = jsonwebtoken.sign(user, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    cookies().set("auth_token", authToken);
    return { success: true };
  } catch (error) {
    if (error instanceof NeonDbError)
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
