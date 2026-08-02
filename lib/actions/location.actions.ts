import {
  LocationCreateInput,
  LocationCreateSchema,
  LocationUpdateInput,
  LocationUpdateSchema,
} from "@/schemas/location.schema";
import { ApiResponse } from "@/types/response";
import { errorResponse } from "@/utils/api-response";
import { handleApiError } from "@/utils/handle-api-error";
import { handleZodError } from "@/utils/handle-zod-errors";
import axiosInstance from "../axios";
import { withAuthHeaders } from "@/utils/server-auth";

export async function createLocation({
  payload,
}: {
  payload: LocationCreateInput;
}): Promise<ApiResponse<{ location: Location } | null>> {
  try {
    const parsed = LocationCreateSchema.safeParse(payload);
    if (parsed.error) {
      return errorResponse(handleZodError(parsed.error) || "Invalid Input");
    }
    const response = await axiosInstance.post(
      "/locations",
      parsed.data,
      await withAuthHeaders(),
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function updateLocation({
  id,
  payload,
}: {
  id: string;
  payload: LocationUpdateInput;
}): Promise<ApiResponse<{ location: Location }>> {
  try {
    const parsed = LocationUpdateSchema.safeParse(payload);
    if (parsed.error) {
      return errorResponse(handleZodError(parsed.error) || "Invalid Input");
    }
    const response = await axiosInstance.patch(
      `/locations/${id}`,
      parsed.data,
      await withAuthHeaders(),
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function deleteLocation({
  id,
}: {
  id: string;
}): Promise<ApiResponse<null>> {
  try {
    const response = await axiosInstance.delete(
      `/locations/${id}`,
      await withAuthHeaders(),
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}
