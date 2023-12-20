import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = cookies().get("auth_token")?.value;
  const onUnprotectedRoutes = ["/auth", "/i/flow/login", "/i/flow/signup"].some(
    (route) => request.nextUrl.pathname.endsWith(route)
  );

  if (!authToken && !onUnprotectedRoutes)
    return NextResponse.redirect(new URL("/auth", request.url));

  if (authToken && onUnprotectedRoutes)
    return NextResponse.redirect(new URL("/", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
