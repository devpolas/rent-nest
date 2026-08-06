// app/api/auth/google/callback/route.ts
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const apiRes = await fetch(
    `${process.env.API}/auth/google/callback${req.nextUrl.search}`,
    {
      headers: { Cookie: req.headers.get("cookie") ?? "" }, // send the session cookie back so Express can verify state
      redirect: "manual",
    },
  );

  // Express verifies the OAuth state, creates the user, sets accessToken + refreshToken cookies,
  // and responds with a redirect to `${website_url}${callbackUrl}`
  const location = apiRes.headers.get("location");
  const res = NextResponse.redirect(location!);

  const setCookies = apiRes.headers.getSetCookie();
  for (const cookie of setCookies) {
  res.headers.append("set-cookie", cookie);
}

  return res;
}
