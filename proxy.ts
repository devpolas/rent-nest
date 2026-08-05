import { NextRequest, NextResponse } from "next/server";

import { getFreshToken, getSession, logout } from "@/lib/actions/auth.actions";

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
  const { pathname, search } = request.nextUrl;

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const isProtectedRoute = pathname.startsWith(PROTECTED_PREFIX);

  const callbackUrl = encodeURIComponent(`${pathname}${search}`);

  let session = await getSession();

  // Try refreshing the access token if no valid session exists.
  if (!session) {
    const refreshed = await getFreshToken();

    if (refreshed) {
      session = await getSession();
    }
  }

  // Redirect unauthenticated users away from protected pages.
  if (!session && isProtectedRoute) {
    await logout();

    return NextResponse.redirect(
      new URL(`/signin?callbackUrl=${callbackUrl}`, request.url),
    );
  }

  // Prevent authenticated users from visiting auth pages.
  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico)$).*)",
  ],
};
