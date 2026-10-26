import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const apiBase = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API;

  if (!apiBase) {
    return Response.json(
      { message: "API_BASE_URL is not configured." },
      { status: 500 },
    );
  }

  const body = await request.text();

  const upstreamUrl = `${apiBase.replace(/\/+$/, "")}/ai/chat`;

  const upstreamResponse = await fetch(upstreamUrl, {
    method: "POST",
    headers: {
      "Content-Type": request.headers.get("content-type") ?? "application/json",
      Accept: "text/plain",
    },
    body,
    cache: "no-store",
    signal: request.signal,
  });

  const headers = new Headers();

  for (const name of [
    "content-type",
    "cache-control",
    "x-accel-buffering",
    "x-ai-provider",
  ]) {
    const value = upstreamResponse.headers.get(name);
    if (value) headers.set(name, value);
  }

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    headers,
  });
}
