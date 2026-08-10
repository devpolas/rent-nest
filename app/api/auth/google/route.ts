import { proxyToExpress, relayCookies } from "@/lib/expressProxy";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const expressRes = await proxyToExpress(req, "/auth/google");

  const location = expressRes.headers.get("location");
  if (!location) {
    return NextResponse.redirect(new URL("/login?error=oauth_failed", req.url));
  }

  const res = NextResponse.redirect(location);
  return relayCookies(expressRes, res);
}
