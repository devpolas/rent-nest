import { ApiResponse } from "@/types/response";
import { errorResponse } from "./api-response";
import axios from "axios";

export function handleApiError<T = null>(error: unknown): ApiResponse<T> {
  if (axios.isAxiosError<ApiResponse<T>>(error)) {
    return (
      error.response?.data ??
      errorResponse<T>(
        error.response?.data.message ?? error.message ?? "Network error",
        error.response?.status ?? 500,
      )
    );
  }

  if (error instanceof Error) {
    return errorResponse<T>(error.message);
  }

  return errorResponse<T>();
}
