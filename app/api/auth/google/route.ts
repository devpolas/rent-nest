import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const callbackUrl = req.nextUrl.searchParams.get("callbackUrl") ?? "/";
  const apiRes = await fetch(
    `${process.env.API}/auth/google?callbackUrl=${encodeURIComponent(callbackUrl)}`,
    { redirect: "manual" },
  );

  const location = apiRes.headers.get("location");
  const res = NextResponse.redirect(location!); // → accounts.google.com

  const setCookies = apiRes.headers.getSetCookie();
  for (const cookie of setCookies) {
    res.headers.append("set-cookie", cookie);
  } // Express session cookie, now bound to your domain
  return res;
}
