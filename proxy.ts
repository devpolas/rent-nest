import { NextRequest, NextResponse } from "next/server";
import { refreshTokens, userSession } from "./lib/actions/account.actions";
import { dashboardRoutes } from "./config/dashboard-routes";
import { UserRole } from "./types/enum";

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

  const isPublic = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const isProtected =
    pathname === PROTECTED_PREFIX ||
    pathname.startsWith(`${PROTECTED_PREFIX}/`);

  const session = await userSession(request);

  if (!session) {
    const setCookies = await refreshTokens(request);

    if (setCookies) {
      const response = NextResponse.next();

      for (const cookie of setCookies) {
        response.headers.append("Set-Cookie", cookie);
      }

      return response;
    }
  }

  if (isPublic) {
    if (session) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  if (isProtected) {
    if (!session) {
      const callbackUrl = encodeURIComponent(`${pathname}${search}`);

      const response = NextResponse.redirect(
        new URL(`/signin?callbackUrl=${callbackUrl}`, request.url),
      );

      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");

      return response;
    }

    const allowedRoutes = dashboardRoutes[session.role as UserRole];

    const hasAccess = allowedRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`),
    );

    if (!hasAccess) {
      return NextResponse.redirect(new URL("/403", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico)$).*)",
  ],
};
