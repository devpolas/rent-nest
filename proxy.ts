import { getFreshToken, getSession, logout } from "@/lib/actions/auth.actions";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = [
  "/signin",
  "/signup",
  "/forget-password",
  "/reset-password",
  "/landlord/signup",
  "/verify-account",
] as const;

const PROTECTED_PREFIX = "/dashboard";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isPublic = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
  const isProtected = pathname.startsWith(PROTECTED_PREFIX);

  let session = await getSession();
  if (!session) {
    const refreshed = await getFreshToken();
    if (refreshed) {
      session = await getSession();
    }
  }
  if (!session && isProtected) {
    await logout();
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (session && isPublic) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
