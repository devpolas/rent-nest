import { NextRequest, NextResponse } from "next/server";
import { proxyToExpress, relayCookies } from "@/lib/expressProxy";

export async function GET(req: NextRequest) {
  const expressRes = await proxyToExpress(req, "/auth/google/callback");

  const location = expressRes.headers.get("location");
  if (!location) {
    return NextResponse.redirect(new URL("/login?error=oauth_failed", req.url));
  }

  const res = NextResponse.redirect(location);
  return relayCookies(expressRes, res);
}
