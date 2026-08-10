import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.API!; // https://renttnest-api.vercel.app

export async function proxyToExpress(req: NextRequest, expressPath: string) {
  const url = `${BACKEND_URL}${expressPath}${req.nextUrl.search}`;
  return fetch(url, {
    method: req.method,
    headers: {
      cookie: req.headers.get("cookie") ?? "",
      "content-type": req.headers.get("content-type") ?? "application/json",
    },
    body: ["GET", "HEAD"].includes(req.method) ? undefined : await req.text(),
    redirect: "manual",
  });
}

export function relayCookies(from: Response, to: NextResponse) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setCookies = (from.headers as any).getSetCookie?.() ?? [];
  for (const cookie of setCookies) {
    to.headers.append("Set-Cookie", cookie);
  }
  return to;
}
