import axios from "axios";
import type { ApiResponse } from "@/types/response";
import { errorResponse } from "./api-response";

export function handleApiError(error: unknown): ApiResponse<null> {
  if (axios.isAxiosError<ApiResponse<null>>(error)) {
    return (
      error.response?.data ??
      errorResponse(
        error.message || "Network error",
        error.response?.status ?? 500,
      )
    );
  }

  if (error instanceof Error) {
    return errorResponse(error.message);
  }

  return errorResponse();
}
