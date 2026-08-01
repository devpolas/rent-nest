import type { ApiResponse, Meta } from "@/types/response";

export function successResponse<T>(
  data: T,
  message = "Success",
  meta?: Meta,
): ApiResponse<T> {
  return {
    success: true,
    message,
    timestamp: new Date().toISOString(),
    data,
    ...(meta && { meta }),
  };
}

export function errorResponse<T = null>(
  message = "Something went wrong",
): ApiResponse<T> {
  return {
    success: false,
    message,
    timestamp: new Date().toISOString(),
  };
}
