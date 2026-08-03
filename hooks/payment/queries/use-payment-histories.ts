"use client";

import { getPaymentHistories } from "@/lib/actions/payment.actions";
import { useQuery } from "@tanstack/react-query";

export function usePaymentHistories() {
  return useQuery({
    queryKey: ["payments"],
    queryFn: getPaymentHistories,
  });
}
