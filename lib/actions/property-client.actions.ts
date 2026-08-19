"use client";

import { PropertyQuery, PropertyQuerySchema } from "@/schemas/property.schema";
import {
  AllPropertyDetailsMap,
  PropertyDetailsMap,
  PropertyResponse,
} from "@/types/property";
import { ApiResponse } from "@/types/response";
import { errorResponse } from "@/utils/api-response";
import { handleZodError } from "@/utils/handle-zod-errors";
import axiosClientInstance from "@/lib/axios/axios-client";
import { handleApiError } from "@/utils/handle-api-error";
import { PropertyImage } from "@/types/property-image";

export async function getAllProperties({
  payload,
}: {
  payload?: PropertyQuery;
}): Promise<ApiResponse<{ properties: PropertyResponse[] } | null>> {
  try {
    const query = new URLSearchParams();

    if (payload) {
      const parsed = PropertyQuerySchema.safeParse(payload);
      if (!parsed.success) {
        return errorResponse(handleZodError(parsed.error) || "Invalid input");
      }
      Object.entries(parsed.data).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") return;

        if (Array.isArray(value)) {
          if (value.length > 0) {
            query.append(key, value.join(","));
          }
        } else {
          query.append(key, String(value));
        }
      });
    }

    const response = await axiosClientInstance.get(
      `/properties?${query.toString()}`,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getPropertyById({
  id,
}: {
  id: string;
}): Promise<ApiResponse<{ property: PropertyResponse } | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Property ID is required");
    }
    const response = await axiosClientInstance.get(`/properties/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getPropertyImages({
  propertyId,
}: {
  propertyId: string;
}): Promise<ApiResponse<{ images: PropertyImage[] } | null>> {
  try {
    const response = await axiosClientInstance.get(
      `/properties/${propertyId}/images`,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getAllPropertyDetails<
  T extends keyof AllPropertyDetailsMap,
>({
  detailsAction,
}: {
  detailsAction: T;
}): Promise<ApiResponse<AllPropertyDetailsMap[T] | null>> {
  try {
    const response = await axiosClientInstance.get(`/${detailsAction}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getPropertyDetails<T extends keyof PropertyDetailsMap>({
  detailsAction,
  id,
}: {
  detailsAction: T;
  id: string;
}): Promise<ApiResponse<PropertyDetailsMap[T] | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Details ID is required");
    }
    const response = await axiosClientInstance.get(`/${detailsAction}/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}
