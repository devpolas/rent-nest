"use client";

import { getPaymentHistoryById } from "@/lib/actions/payment.actions";
import { useQuery } from "@tanstack/react-query";

export function usePaymentHistory(transactionId: string) {
  return useQuery({
    queryKey: ["payments", transactionId],
    queryFn: () =>
      getPaymentHistoryById({
        transactionId,
      }),
    enabled: !!transactionId,
  });
}
