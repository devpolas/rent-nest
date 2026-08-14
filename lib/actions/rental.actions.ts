"use server";

import { RentalRequest, RentalRequestResponse } from "@/types/rental-request";
import {
  RentalRequestAdminAndOwnerUpdateSchema,
  RentalRequestAdminAndOwnerUpdateType,
  RentalRequestSchema,
  RentalRequestTenantUpdateSchema,
  RentalRequestTenantUpdateType,
  RentalRequestType,
} from "@/schemas/rental.schema";

import type { ApiResponse } from "@/types/response";

import { handleApiError } from "@/utils/handle-api-error";
import { handleZodError } from "@/utils/handle-zod-errors";
import { errorResponse } from "@/utils/api-response";
import axiosServerInstance from "../axios/axios-server";

export async function createRentalRequest({
  payload,
}: {
  payload: RentalRequestType;
}): Promise<ApiResponse<{ rent: RentalRequest } | null>> {
  try {
    const parsed = RentalRequestSchema.safeParse(payload);

    if (!parsed.success) {
      return errorResponse(handleZodError(parsed.error) || "Invalid input");
    }

    const response = await axiosServerInstance.post(
      "/rental-requests",
      parsed.data,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function updateRentalRequestByTenant({
  id,
  payload,
}: {
  id: string;
  payload: RentalRequestTenantUpdateType;
}): Promise<ApiResponse<{ rent: RentalRequest } | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Rental request ID is required");
    }

    const parsed = RentalRequestTenantUpdateSchema.safeParse(payload);

    if (!parsed.success) {
      return errorResponse(handleZodError(parsed.error) || "Invalid input");
    }

    const response = await axiosServerInstance.patch(
      `/rental-requests/${id}`,
      parsed.data,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function updateRentalRequestByOwnerOrAdmin({
  id,
  payload,
}: {
  id: string;
  payload: RentalRequestAdminAndOwnerUpdateType;
}): Promise<ApiResponse<{ rent: RentalRequest } | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Rental request ID is required");
    }

    const parsed = RentalRequestAdminAndOwnerUpdateSchema.safeParse(payload);

    if (!parsed.success) {
      return errorResponse(handleZodError(parsed.error) || "Invalid input");
    }

    const response = await axiosServerInstance.patch(
      `/rental-requests/${id}`,
      parsed.data,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getRentalRequests(): Promise<
  ApiResponse<{ rents: RentalRequestResponse[] } | null>
> {
  try {
    const response = await axiosServerInstance.get("/rental-requests");

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getRentalRequestById({
  id,
}: {
  id: string;
}): Promise<ApiResponse<{ rent: RentalRequestResponse } | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Rental request ID is required");
    }

    const response = await axiosServerInstance.get(`/rental-requests/${id}`);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function deleteRentalRequest({
  id,
}: {
  id: string;
}): Promise<ApiResponse<null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Rental request ID is required");
    }

    const response = await axiosServerInstance.delete(`/rental-requests/${id}`);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}
