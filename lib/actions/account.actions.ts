"use server";

import axiosServerInstance from "@/lib/axios/axios-server";
import { ApiResponse } from "@/types/response";
import { handleApiError } from "@/utils/handle-api-error";
import { cookies } from "next/headers";
import { Time } from "@/utils/helpers";
import { SigninPayload, SigninSchema } from "@/schemas/auth.schema";
import { errorResponse } from "@/utils/api-response";
import { handleZodError } from "@/utils/handle-zod-errors";
import { NextRequest } from "next/server";
import Jwt from "jsonwebtoken";

interface AccountSession {
  userId: string;
  role: string;
  email: string;
  sessionId: string;
}

// ================= save cookies =================
function saveCookie(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
  cookie: string,
) {
  const [cookieValue] = cookie.split(";");

  const separator = cookieValue.indexOf("=");

  const name = cookieValue.slice(0, separator);
  const value = cookieValue.slice(separator + 1);

  cookieStore.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: name === "refreshToken" ? Time.day(30) : Time.day(1),
  });
}

// ================= signin =================
export async function signin(
  payload: SigninPayload,
): Promise<ApiResponse<{ accessToken: string } | null>> {
  try {
    const cookieStore = await cookies();

    const parse = SigninSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    const response = await axiosServerInstance.post<ApiResponse<null>>(
      "/auth/signin",
      parse.data,
    );

    const setCookie = response.headers["set-cookie"] as string[] | undefined;

    if (setCookie) {
      for (const cookie of setCookie) {
        saveCookie(cookieStore, cookie);
      }
    }

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

// ================= logout =================
export async function logout(): Promise<ApiResponse<null>> {
  const cookieStore = await cookies();

  try {
    const response = await axiosServerInstance.post<ApiResponse<null>>(
      "/auth/logout",
      {},
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  } finally {
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
  }
}

// ================= logout device with sessionId =================
export async function logoutDeviceBySessionId(
  session: string,
): Promise<ApiResponse<null>> {
  try {
    const response = await axiosServerInstance.delete<ApiResponse<null>>(
      `/auth/sessions/${session}`,
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

// ================= logout from all other devices =================
export async function logoutFromOtherDevices(): Promise<ApiResponse<null>> {
  try {
    const response = await axiosServerInstance.post<ApiResponse<null>>(
      "/auth/logout-other-devices",
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function isValidSession(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get("accessToken")?.value;
  if (!token) return false;
  try {
    Jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
    return true;
  } catch {
    return false;
  }
}

export async function userSession(
  request: NextRequest,
): Promise<AccountSession | null> {
  const token = request.cookies.get("accessToken")?.value;

  if (!token) return null;

  try {
    return Jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as AccountSession;
  } catch {
    return null;
  }
}

export async function refreshTokens(
  request: NextRequest,
): Promise<string[] | null> {
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
