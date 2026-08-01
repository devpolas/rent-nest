import { ApiResponse } from "@/types/response";
import axiosInstance from "../axios";
import { handleApiError } from "@/utils/handle-api-error";
import { Property } from "@/types/property";
import {
  PropertyAdminSchema,
  PropertyInputType,
  PropertyQuery,
  PropertyQuerySchema,
  PropertyUpdateInputType,
} from "@/schemas/property.schema";
import { errorResponse } from "@/utils/api-response";
import { handleZodError } from "@/utils/handle-zod-errors";
import httpStatus from "http-status";

export async function getAllProperties({
  payload,
}: {
  payload: PropertyQuery;
}): Promise<ApiResponse<Property[] | null>> {
  try {
    const parsed = PropertyQuerySchema.safeParse(payload);

    if (!parsed.success) {
      return errorResponse(
        handleZodError(parsed.error) || "Invalid input",
        httpStatus.BAD_REQUEST,
      );
    }

    const query = new URLSearchParams();

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

    const response = await axiosInstance.get(`/properties?${query.toString()}`);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function createProperty({
  payload,
}: {
  payload: PropertyInputType;
}): Promise<ApiResponse<Property | null>> {
  try {
    const parsed = PropertyAdminSchema.safeParse(payload);

    if (!parsed.success) {
      return errorResponse(
        handleZodError(parsed.error) || "Invalid input",
        httpStatus.BAD_REQUEST,
      );
    }
    const response = await axiosInstance.post("/properties", parsed.data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function updateProperty({
  id,
  payload,
}: {
  id: string;
  payload: PropertyUpdateInputType;
}): Promise<ApiResponse<Property | null>> {
  try {
    if (!id) {
      throw new Error("property id is required");
    }
    const parsed = PropertyAdminSchema.safeParse(payload);
    if (!parsed.success) {
      return errorResponse(
        handleZodError(parsed.error) || "Invalid input",
        httpStatus.BAD_REQUEST,
      );
    }
    const response = await axiosInstance.patch(
      `/properties/${id}`,
      parsed.data,
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
}): Promise<ApiResponse<Property | null>> {
  try {
    if (!id) {
      throw new Error("property id is required");
    }
    const response = await axiosInstance.get(`/properties/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function deletePropertyById({
  id,
}: {
  id: string;
}): Promise<ApiResponse<null>> {
  try {
    if (!id) {
      throw new Error("property id is required");
    }
    const response = await axiosInstance.delete(`/properties/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}
