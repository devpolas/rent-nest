import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";

const PUBLIC_ROUTES = [
  "/signin",
  "/signup",
  "/forget-password",
  "/reset-password",
  "/landlord/signup",
  "/verify-account",
] as const;

const PROTECTED_PREFIX = "/dashboard";

function isValidSession(request: NextRequest): boolean {
  const token = request.cookies.get("accessToken")?.value;
  if (!token) return false;
  try {
    Jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
    return true;
  } catch {
    return false;
  }
}

async function refreshTokens(request: NextRequest): Promise<string[] | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          Cookie: request.headers.get("cookie") ?? "",
        },
      },
    );
    if (!res.ok) return null;
    const setCookie = res.headers.getSetCookie?.() ?? [];
    return setCookie.length ? setCookie : null;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
  const isProtectedRoute =
    pathname === PROTECTED_PREFIX ||
    pathname.startsWith(`${PROTECTED_PREFIX}/`);

  if (isPublicRoute) {
    if (isValidSession(request)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (isProtectedRoute) {
    if (isValidSession(request)) {
      return NextResponse.next();
    }

    const setCookies = await refreshTokens(request);

    if (setCookies) {
      const response = NextResponse.next();
      for (const cookie of setCookies) {
        response.headers.append("Set-Cookie", cookie);
      }
      return response;
    }

    const callbackUrl = encodeURIComponent(`${pathname}${search}`);
    const redirectRes = NextResponse.redirect(
      new URL(`/signin?callbackUrl=${callbackUrl}`, request.url),
    );
    redirectRes.cookies.delete("accessToken");
    redirectRes.cookies.delete("refreshToken");
    return redirectRes;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico)$).*)",
  ],
};
