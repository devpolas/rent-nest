import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const callbackUrl = req.nextUrl.searchParams.get("callbackUrl") ?? "/";
  const apiRes = await fetch(
    `${process.env.API}/auth/google?callbackUrl=${encodeURIComponent(callbackUrl)}`,
    { redirect: "manual" },
  );

  const location = apiRes.headers.get("location");
  const res = NextResponse.redirect(location!); // → accounts.google.com

  const setCookie = apiRes.headers.get("set-cookie");
  if (setCookie) res.headers.set("set-cookie", setCookie); // Express session cookie, now bound to your domain
  return res;
}
