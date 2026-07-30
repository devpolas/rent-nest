import type { ApiResponse } from "@/types/response";

export function successResponse<T>(
  data: T,
  message = "Success",
  status = 200,
): ApiResponse<T> {
  return {
    success: true,
    message,
    status,
    data,
  };
}

export function errorResponse<T = null>(
  message = "Something went wrong",
  status = 500,
): ApiResponse<T> {
  return {
    success: false,
    message,
    status,
  };
}
