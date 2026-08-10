import { NextRequest, NextResponse } from "next/server";

import {
  getFreshToken,
  getSession,
  logout,
} from "./lib/actions/account.actions";

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

  const isProtectedRoute =
    pathname === PROTECTED_PREFIX ||
    pathname.startsWith(`${PROTECTED_PREFIX}/`);

  const callbackUrl = encodeURIComponent(`${pathname}${search}`);

  let session = await getSession();

  if (!session && isProtectedRoute) {
    const refreshed = await getFreshToken();

    if (refreshed) {
      session = await getSession();
    }
  }

  if (!session && isProtectedRoute) {
    await logout();
    return NextResponse.redirect(
      new URL(`/signin?callbackUrl=${callbackUrl}`, request.url),
    );
  }

  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico)$).*)",
  ],
};
