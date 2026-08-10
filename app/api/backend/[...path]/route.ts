import { NextRequest, NextResponse } from "next/server";
import { proxyToExpress, relayCookies } from "@/lib/expressProxy";

async function handler(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const expressRes = await proxyToExpress(req, `/${path.join("/")}`);

  const body = await expressRes.arrayBuffer();
  const res = new NextResponse(body, {
    status: expressRes.status,
    headers: {
      "content-type":
        expressRes.headers.get("content-type") ?? "application/json",
    },
  });

  return relayCookies(expressRes, res);
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};
