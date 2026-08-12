"use client";

import {
  ResetPasswordPayload,
  ResetPasswordSchema,
  SignupPayload,
  SignupSchema,
  VerifyEmailPayload,
  VerifyEmailSchema,
} from "@/schemas/auth.schema";
import { handleZodError } from "@/utils/handle-zod-errors";
import type { User } from "@/types/user";
import { errorResponse } from "@/utils/api-response";
import { handleApiError } from "@/utils/handle-api-error";
import { ApiResponse } from "../../types/response";
import axiosClientInstance from "@/lib/axios/axios-client";

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

    const response = await axiosClientInstance.post<ApiResponse<null>>(
      "/auth/signup",
      parse.data,
    );

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

    const response = await axiosClientInstance.post<ApiResponse<null>>(
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

    const response = await axiosClientInstance.post<ApiResponse<null>>(
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
    const response = await axiosClientInstance.post<ApiResponse<null>>(
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

    const response = await axiosClientInstance.post<ApiResponse<null>>(
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
