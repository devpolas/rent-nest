"use server";

import { handleApiError } from "@/utils/handle-api-error";
import { handleZodError } from "@/utils/handle-zod-errors";
import type { ApiResponse } from "@/types/response";
import type { Review, ReviewResponse } from "@/types/review";
import {
  ReviewInputType,
  ReviewSchema,
  ReviewUpdateInputType,
  ReviewUpdateSchema,
} from "@/schemas/review.schema";
import { errorResponse } from "@/utils/api-response";
import axiosServerInstance from "../axios/axios-server";

export async function createReview({
  propertyId,
  payload,
}: {
  propertyId: string;
  payload: ReviewInputType;
}): Promise<ApiResponse<{ review: Review } | null>> {
  try {
    if (!propertyId.trim()) {
      return errorResponse("Property ID is required");
    }

    const parsed = ReviewSchema.safeParse(payload);

    if (!parsed.success) {
      return errorResponse(handleZodError(parsed.error) || "Invalid input");
    }

    const response = await axiosServerInstance.post(
      `/properties/${propertyId}/reviews`,
      parsed.data,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function updateReview({
  id,
  payload,
}: {
  id: string;
  payload: ReviewUpdateInputType;
}): Promise<ApiResponse<{ review: Review } | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Review ID is required");
    }

    const parsed = ReviewUpdateSchema.safeParse(payload);

    if (!parsed.success) {
      return errorResponse(handleZodError(parsed.error) || "Invalid input");
    }

    const response = await axiosServerInstance.patch(
      `/reviews/${id}`,
      parsed.data,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function deleteReview({
  id,
}: {
  id: string;
}): Promise<ApiResponse<null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Review ID is required");
    }

    const response = await axiosServerInstance.delete(`/reviews/${id}`);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getAllReviews(): Promise<
  ApiResponse<{ reviews: ReviewResponse[] } | null>
> {
  try {
    const response = await axiosServerInstance.get("/reviews/admin/all");

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}
