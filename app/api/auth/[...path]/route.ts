import { NextRequest, NextResponse } from "next/server";

// app/api/auth/[...path]/route.ts
async function handler(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const url = `${process.env.API}/auth/${path.join("/")}`;

  const apiRes = await fetch(url, {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      Cookie: req.headers.get("cookie") ?? "",
    },
    body: req.method !== "GET" ? await req.text() : undefined,
  });

  const res = new NextResponse(await apiRes.text(), { status: apiRes.status });
  const setCookie = apiRes.headers.get("set-cookie");
  if (setCookie) res.headers.set("set-cookie", setCookie);
  return res;
}

export { handler as GET, handler as POST, handler as DELETE, handler as PUT };
