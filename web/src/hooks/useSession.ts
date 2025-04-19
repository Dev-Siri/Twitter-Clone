import jwtDecode from "jwt-decode";
import { cookies } from "next/headers";

import type { User } from "@/types";

export function useSession() {
  const authToken = cookies().get("auth_token")?.value;

  if (authToken)
    return jwtDecode<Omit<User, "password" | "createdAt">>(authToken);
}
