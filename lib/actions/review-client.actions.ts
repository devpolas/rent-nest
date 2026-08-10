"use client";

import { ApiResponse } from "@/types/response";
import axiosClientInstance from "../axios/axios-client";
import { errorResponse } from "@/utils/api-response";
import { handleApiError } from "@/utils/handle-api-error";
import { Review } from "@/types/review";

export async function getReviewById({
  id,
}: {
  id: string;
}): Promise<ApiResponse<{ review: Review } | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Review ID is required");
    }

    const response = await axiosClientInstance.get(`/reviews/${id}`);

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

    const response = await axiosClientInstance.get(
      `/properties/${propertyId}/reviews`,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}
