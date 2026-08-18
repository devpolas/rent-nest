"use server";

import type { ApiResponse } from "@/types/response";
import type { PaymentHistory } from "@/types/payment";
import { handleApiError } from "@/utils/handle-api-error";
import { errorResponse } from "@/utils/api-response";
import axiosServerInstance from "../axios/axios-server";

export async function makePayment({
  rentRequestId,
}: {
  rentRequestId: string;
}): Promise<ApiResponse<{ url: string } | null>> {
  try {
    if (!rentRequestId.trim()) {
      return errorResponse("Rental request ID is required");
    }

    const response = await axiosServerInstance.post(
      `/rental-requests/${rentRequestId}/payment`,
      {},
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getPaymentHistories(): Promise<
  ApiResponse<{ paymentHistory: PaymentHistory[] } | null>
> {
  try {
    const response = await axiosServerInstance.get("/payments");

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

    const response = await axiosServerInstance.get(
      `/payments/transaction/${transactionId}`,
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

    const response = await axiosServerInstance.get(
      `/payments/session/${sessionId}`,
    );

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}
