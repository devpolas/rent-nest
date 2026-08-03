"use server";

import axiosInstance from "../axios";
import type { ApiResponse } from "@/types/response";
import type { PaymentHistory } from "@/types/payment";
import { handleApiError } from "@/utils/handle-api-error";
import { withAuthHeaders } from "@/utils/server-auth";
import { errorResponse } from "@/utils/api-response";

export async function getPaymentHistories(): Promise<
  ApiResponse<{ paymentHistory: PaymentHistory[] } | null>
> {
  try {
    const response = await axiosInstance.get(
      "/payments",
      await withAuthHeaders(),
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getPaymentHistoryById({
  transactionId,
}: {
  transactionId: string;
}): Promise<ApiResponse<{ paymentHistory: PaymentHistory } | null>> {
  try {
    if (!transactionId.trim()) {
      return errorResponse("Transaction ID is required");
    }

    const response = await axiosInstance.get(
      `/payments/transaction/${transactionId}`,
      await withAuthHeaders(),
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getPaymentSession({
  sessionId,
}: {
  sessionId: string;
}): Promise<ApiResponse<{ session: unknown } | null>> {
  try {
    if (!sessionId.trim()) {
      return errorResponse("Session ID is required");
    }

    const response = await axiosInstance.get(
      `/payments/session/${sessionId}`,
      await withAuthHeaders(),
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function makePayment({
  rentRequestId,
}: {
  rentRequestId: string;
}): Promise<ApiResponse<{ url: string } | null>> {
  try {
    if (!rentRequestId.trim()) {
      return errorResponse("Rental request ID is required");
    }

    const response = await axiosInstance.post(
      `/rentals/${rentRequestId}/payment`,
      {},
      await withAuthHeaders(),
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}
