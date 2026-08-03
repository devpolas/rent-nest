"use server";

import axiosInstance from "../axios/axios";
import { handleApiError } from "@/utils/handle-api-error";
import { handleZodError } from "@/utils/handle-zod-errors";
import type { ApiResponse } from "@/types/response";
import type { Review } from "@/types/review";

import {
  ReviewInputType,
  ReviewSchema,
  ReviewUpdateInputType,
  ReviewUpdateSchema,
} from "@/schemas/review.schema";
import { errorResponse } from "@/utils/api-response";

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

    const response = await axiosInstance.post(
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

    const response = await axiosInstance.patch(`/reviews/${id}`, parsed.data);

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

    const response = await axiosInstance.delete(`/reviews/${id}`);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getReviewById({
  id,
}: {
  id: string;
}): Promise<ApiResponse<{ review: Review } | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Review ID is required");
    }

    const response = await axiosInstance.get(`/reviews/${id}`);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getReviewsByPropertyId({
  propertyId,
}: {
  propertyId: string;
}): Promise<ApiResponse<{ reviews: Review[] } | null>> {
  try {
    if (!propertyId.trim()) {
      return errorResponse("Property ID is required");
    }

    const response = await axiosInstance.get(
      `/properties/${propertyId}/reviews`,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getAllReviews(): Promise<
  ApiResponse<{ reviews: Review[] } | null>
> {
  try {
    const response = await axiosInstance.get("/reviews/admin/all");

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}
