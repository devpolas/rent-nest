"use client";

import { getPaymentSession } from "@/lib/actions/payment.actions";
import { useQuery } from "@tanstack/react-query";

export function usePaymentSession(sessionId: string) {
  return useQuery({
    queryKey: ["payment-session", sessionId],
    queryFn: () =>
      getPaymentSession({
        sessionId,
      }),
    enabled: !!sessionId,
  });
}
