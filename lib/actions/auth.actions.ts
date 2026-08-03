"use server";
import {
  ResetPasswordPayload,
  ResetPasswordSchema,
  SigninPayload,
  SigninSchema,
  SignupPayload,
  SignupSchema,
  VerifyEmailPayload,
  VerifyEmailSchema,
} from "@/schemas/auth.schema";
import { handleZodError } from "@/utils/handle-zod-errors";
import axiosInstance from "../axios/axios";
import type { User } from "@/types/user";
import { errorResponse } from "@/utils/api-response";
import { handleApiError } from "@/utils/handle-api-error";
import { cookies } from "next/headers";
import { Time } from "@/utils/helpers";
import Jwt from "jsonwebtoken";
import config from "@/config/server/server";
import { withAuthHeaders } from "@/utils/server-auth";
import { ApiResponse } from "../../types/response";

interface AccountSession {
  userId: string;
  role: string;
  email: string;
  sessionId: string;
}

// ================= signup =================
export async function signup(
  payload: SignupPayload,
): Promise<ApiResponse<{ user: User } | null>> {
  try {
    const parse = SignupSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(handleZodError(parse.error) || "Invalid input");
    }

    const { password, confirmPassword } = parse.data;

    if (password !== confirmPassword) {
      return errorResponse("Passwords do not match");
    }

    const response = await axiosInstance.post<ApiResponse<null>>(
      "/auth/signup",
      parse.data,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
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
    secure: config.node_env === "production",
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

    const response = await axiosInstance.post<ApiResponse<null>>(
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

// ================= resend verification =================
export async function sendVerificationEmail({
  email,
}: {
  email: string;
}): Promise<ApiResponse<null>> {
  try {
    if (!email) {
      return handleApiError("Please provide email");
    }

    const response = await axiosInstance.post<ApiResponse<null>>(
      "/auth/resend-verification",
      {
        email,
      },
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}
// ================= verify email =================
export async function verifyEmail(
  payload: VerifyEmailPayload,
): Promise<ApiResponse<null>> {
  try {
    const parsed = VerifyEmailSchema.safeParse(payload);

    if (!parsed.success) {
      return errorResponse("Invalid verification data");
    }

    const response = await axiosInstance.post<ApiResponse<null>>(
      "/auth/verify-email",
      parsed.data,
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

// ================= forget password =================
export async function forgotPassword({
  email,
}: {
  email: string;
}): Promise<ApiResponse<null>> {
  try {
    if (!email) {
      return handleApiError("Please provide email");
    }
    const response = await axiosInstance.post<ApiResponse<null>>(
      "/auth/forgot-password",
      {
        email,
      },
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

// ================= reset password =================
export async function resetPassword({
  payload,
  token,
}: {
  payload: ResetPasswordPayload;
  token: string;
}): Promise<ApiResponse<null>> {
  const parsed = ResetPasswordSchema.safeParse(payload);

  if (!parsed.success) {
    return errorResponse(handleZodError(parsed.error) || "Invalid input");
  }

  if (!token) {
    return errorResponse("Token is required");
  }

  try {
    const { password, confirmPassword } = parsed.data;

    if (password !== confirmPassword) {
      return errorResponse("Passwords do not match");
    }

    const response = await axiosInstance.post<ApiResponse<null>>(
      "/auth/reset-password",
      {
        token,
        password,
        confirmPassword,
      },
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

// ================= logout =================
export async function logout(): Promise<ApiResponse<null>> {
  const cookieStore = await cookies();

  try {
    const response = await axiosInstance.post<ApiResponse<null>>(
      "/auth/logout",
      {},
      await withAuthHeaders(),
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
    const response = await axiosInstance.delete<ApiResponse<null>>(
      `/auth/sessions/${session}`,
      await withAuthHeaders(),
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

// ================= logout from all other devices =================
export async function logoutFromOtherDevices(): Promise<ApiResponse<null>> {
  try {
    const response = await axiosInstance.post<ApiResponse<null>>(
      "/auth/logout-other-devices",
      await withAuthHeaders(),
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

// ================= session =================
export async function getSession(): Promise<AccountSession | null> {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    if (!token) return null;
    return Jwt.verify(token, config.jwt_access_secret) as AccountSession;
  } catch {
    return null;
  }
}

export async function getFreshToken(): Promise<
  | ApiResponse<{
      accessToken: string;
    }>
  | boolean
> {
  try {
    const cookieStore = await cookies();
    const response = await axiosInstance.get(
      "/auth/refresh-token",
      await withAuthHeaders(),
    );
    const setCookie = response.headers["set-cookie"] as string[] | undefined;

    if (setCookie) {
      for (const cookie of setCookie) {
        saveCookie(cookieStore, cookie);
      }
    }
    return true;
  } catch (error) {
    return false;
  }
}
