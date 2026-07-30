import type { ApiResponse } from "@/types/response";

export function successResponse<T>(
  data: T,
  message = "Success",
  statusCode = 200,
): ApiResponse<T> {
  return {
    success: true,
    message,
    statusCode,
    data,
  };
}

export function errorResponse<T = null>(
  message = "Something went wrong",
  statusCode = 500,
): ApiResponse<T> {
  return {
    success: false,
    message,
    statusCode,
  };
}
