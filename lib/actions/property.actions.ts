"use server";
import { ApiResponse } from "@/types/response";
import axiosServerInstance from "@/lib/axios/axios-server";
import { handleApiError } from "@/utils/handle-api-error";
import {
  Property,
  PropertyDetailsMap,
  PropertyResponse,
} from "@/types/property";
import {
  CreatePropertyImageInput,
  CreatePropertyImageSchema,
  PropertyAdminUpdateSchema,
  PropertyDetailsSchema,
  PropertyDetailsType,
  PropertyDetailsUpdateSchema,
  PropertyDetailsUpdateType,
  PropertyInputType,
  PropertySchema,
  PropertyUpdateAdminInputType,
  PropertyUpdateInputType,
  PropertyUpdateSchema,
} from "@/schemas/property.schema";
import { errorResponse } from "@/utils/api-response";
import { handleZodError } from "@/utils/handle-zod-errors";
import { PropertyImage } from "@/types/property-image";

export async function getMyAllProperties(): Promise<
  ApiResponse<{ properties: PropertyResponse[] } | null>
> {
  try {
    const response = await axiosServerInstance.get("/properties/my-properties");
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
    const parsed = PropertySchema.safeParse(payload);

    if (!parsed.success) {
      return errorResponse(handleZodError(parsed.error) || "Invalid input");
    }
    const response = await axiosServerInstance.post("/properties", parsed.data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function updatePropertyByAdmin({
  id,
  payload,
}: {
  id: string;
  payload: PropertyUpdateAdminInputType;
}): Promise<ApiResponse<{ property: Property } | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Property ID is required");
    }
    const parsed = PropertyAdminUpdateSchema.safeParse(payload);
    if (!parsed.success) {
      return errorResponse(handleZodError(parsed.error) || "Invalid input");
    }
    const response = await axiosServerInstance.patch(
      `/properties/${id}`,
      parsed.data,
    );
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
    const parsed = PropertyUpdateSchema.safeParse(payload);
    if (!parsed.success) {
      return errorResponse(handleZodError(parsed.error) || "Invalid input");
    }
    const response = await axiosServerInstance.patch(
      `/properties/${id}`,
      parsed.data,
    );
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
    const response = await axiosServerInstance.delete(`/properties/${id}`);
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
    const response = await axiosServerInstance.post(
      `/${detailsAction}`,
      parsed.data,
    );
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
    const response = await axiosServerInstance.patch(
      `/${detailsAction}/${id}`,
      parsed.data,
    );
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
    const response = await axiosServerInstance.delete(
      `/${detailsAction}/${id}`,
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function createPropertyImages({
  propertyId,
  payload,
}: {
  propertyId: string;
  payload: CreatePropertyImageInput;
}): Promise<ApiResponse<{ images: PropertyImage[] } | null>> {
  try {
    const parsed = CreatePropertyImageSchema.safeParse(payload);
    if (!parsed.success) {
      return errorResponse(handleZodError(parsed.error) || "Invalid Input");
    }
    const response = await axiosServerInstance.post(
      `/properties/${propertyId}/images`,
      parsed.data,
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function setPropertyThumbnail({
  propertyId,
  imageId,
}: {
  propertyId: string;
  imageId: string;
}): Promise<ApiResponse<{ image: PropertyImage } | null>> {
  try {
    const response = await axiosServerInstance.patch(
      `/properties/${propertyId}/images/${imageId}/thumbnail`,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function deletePropertyImage({
  propertyId,
  imageId,
}: {
  propertyId: string;
  imageId: string;
}): Promise<ApiResponse<null>> {
  try {
    const response = await axiosServerInstance.delete(
      `/properties/${propertyId}/images/${imageId}`,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}
