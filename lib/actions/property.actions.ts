import { ApiResponse } from "@/types/response";
import axiosInstance from "../axios";
import { handleApiError } from "@/utils/handle-api-error";
import {
  AllPropertyDetailsMap,
  Amenity,
  Category,
  Feature,
  Property,
  PropertyDetailsMap,
  Rule,
} from "@/types/property";
import {
  PropertyAdminSchema,
  PropertyDetailsSchema,
  PropertyDetailsType,
  PropertyDetailsUpdateSchema,
  PropertyDetailsUpdateType,
  PropertyInputType,
  PropertyQuery,
  PropertyQuerySchema,
  PropertyUpdateInputType,
} from "@/schemas/property.schema";
import { errorResponse } from "@/utils/api-response";
import { handleZodError } from "@/utils/handle-zod-errors";

export async function getAllProperties({
  payload,
}: {
  payload?: PropertyQuery;
}): Promise<ApiResponse<{ properties: Property[] } | null>> {
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
}): Promise<ApiResponse<{ property: Property } | null>> {
  try {
    const parsed = PropertyAdminSchema.safeParse(payload);

    if (!parsed.success) {
      return errorResponse(handleZodError(parsed.error) || "Invalid input");
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
}): Promise<ApiResponse<{ property: Property } | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Property ID is required");
    }
    const parsed = PropertyAdminSchema.safeParse(payload);
    if (!parsed.success) {
      return errorResponse(handleZodError(parsed.error) || "Invalid input");
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
}): Promise<ApiResponse<{ property: Property } | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Property ID is required");
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
    if (!id.trim()) {
      return errorResponse("Property ID is required");
    }
    const response = await axiosInstance.delete(`/properties/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function createPropertyDetails<
  T extends keyof PropertyDetailsMap,
>({
  detailsAction,
  payload,
}: {
  detailsAction: T;
  payload: PropertyDetailsType;
}): Promise<ApiResponse<PropertyDetailsMap[T] | null>> {
  try {
    const parsed = PropertyDetailsSchema.safeParse(payload);
    if (!parsed.success) {
      return errorResponse(handleZodError(parsed.error) || "Invalid input");
    }
    const response = await axiosInstance.post(`/${detailsAction}`, parsed.data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function updatePropertyDetails<
  T extends keyof PropertyDetailsMap,
>({
  id,
  detailsAction,
  payload,
}: {
  id: string;
  detailsAction: T;
  payload: PropertyDetailsUpdateType;
}): Promise<ApiResponse<PropertyDetailsMap[T] | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Details ID is required");
    }
    const parsed = PropertyDetailsUpdateSchema.safeParse(payload);
    if (!parsed.success) {
      return errorResponse(handleZodError(parsed.error) || "Invalid input");
    }
    const response = await axiosInstance.patch(
      `/${detailsAction}/${id}`,
      parsed.data,
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
    const response = await axiosInstance.get(`/${detailsAction}`);
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
    const response = await axiosInstance.get(`/${detailsAction}/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function deletePropertyDetails<
  T extends keyof PropertyDetailsMap,
>({
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
    const response = await axiosInstance.delete(`/${detailsAction}/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}
