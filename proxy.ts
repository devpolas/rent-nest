import { NextRequest, NextResponse } from "next/server";

import { getDashboardPath, hasRouteAccess } from "./config/dashboard-routes";

import { UserRole } from "./types/enum";
import {
  refreshTokens,
  userSession,
  verifyAccessToken,
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

function isRouteMatch(pathname: string, route: string): boolean {
  return pathname === route || pathname.startsWith(`${route}/`);
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const isPublic = PUBLIC_ROUTES.some((route) => isRouteMatch(pathname, route));

  const isProtected =
    pathname === PROTECTED_PREFIX ||
    pathname.startsWith(`${PROTECTED_PREFIX}/`);

  /**
   * Routes outside authentication-related routes
   * don't need any session check.
   */
  if (!isPublic && !isProtected) {
    return NextResponse.next();
  }

  /**
   * First try the existing access token.
   */
  let session = await userSession(request);

  /**
   * If the access token is expired/invalid,
   * try refreshing it.
   */
  let refreshedCookies: string[] | null = null;

  if (!session) {
    refreshedCookies = await refreshTokens(request);

    if (refreshedCookies) {
      const accessToken = refreshedCookies
        .find((cookie) => cookie.startsWith("accessToken="))
        ?.split(";")[0]
        ?.split("=")[1];

      if (accessToken) {
        session = await verifyAccessToken(accessToken);
      }
    }
  }

  /**
   * PUBLIC ROUTES
   */
  if (isPublic) {
    if (session) {
      const response = NextResponse.redirect(new URL("/", request.url));

      if (refreshedCookies) {
        for (const cookie of refreshedCookies) {
          response.headers.append("Set-Cookie", cookie);
        }
      }

      return response;
    }

    return NextResponse.next();
  }

  /**
   * PROTECTED DASHBOARD ROUTES
   */
  if (isProtected) {
    /**
     * User is not authenticated even after
     * attempting token refresh.
     */
    if (!session) {
      const callbackUrl = `${pathname}${search}`;

      const response = NextResponse.redirect(
        new URL(
          `/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`,
          request.url,
        ),
      );

      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");

      return response;
    }

    const role = session.role as UserRole;

    /**
     * /dashboard
     *
     * Redirect the user to their own dashboard.
     */
    if (pathname === PROTECTED_PREFIX) {
      const response = NextResponse.redirect(
        new URL(getDashboardPath(role), request.url),
      );

      if (refreshedCookies) {
        for (const cookie of refreshedCookies) {
          response.headers.append("Set-Cookie", cookie);
        }
      }

      return response;
    }

    /**
     * Check whether the authenticated user's
     * role is allowed to access this dashboard.
     */
    if (!hasRouteAccess(role, pathname)) {
      const response = NextResponse.redirect(
        new URL(getDashboardPath(role), request.url),
      );

      if (refreshedCookies) {
        for (const cookie of refreshedCookies) {
          response.headers.append("Set-Cookie", cookie);
        }
      }

      return response;
    }
  }

  /**
   * Continue with the request.
   *
   * If the access token was refreshed, forward
   * the new cookies to the browser.
   */
  const response = NextResponse.next();

  if (refreshedCookies) {
    for (const cookie of refreshedCookies) {
      response.headers.append("Set-Cookie", cookie);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico)$).*)",
  ],
};
