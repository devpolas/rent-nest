"use server";

import { RentalRequest } from "@/types/rental-request";
import axiosInstance from "../axios";
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
import { withAuthHeaders } from "@/utils/server-auth";

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

    const response = await axiosInstance.post(
      "/rental-requests",
      parsed.data,
      await withAuthHeaders(),
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

    const response = await axiosInstance.patch(
      `/rental-requests/${id}`,
      parsed.data,
      await withAuthHeaders(),
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

    const response = await axiosInstance.patch(
      `/rental-requests/${id}`,
      parsed.data,
      await withAuthHeaders(),
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getRentalRequests(): Promise<
  ApiResponse<{ rents: RentalRequest[] } | null>
> {
  try {
    const response = await axiosInstance.get(
      "/rental-requests",
      await withAuthHeaders(),
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getRentalRequestById({
  id,
}: {
  id: string;
}): Promise<ApiResponse<{ rent: RentalRequest } | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Rental request ID is required");
    }

    const response = await axiosInstance.get(
      `/rental-requests/${id}`,
      await withAuthHeaders(),
    );

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

    const response = await axiosInstance.delete(
      `/rental-requests/${id}`,
      await withAuthHeaders(),
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}
