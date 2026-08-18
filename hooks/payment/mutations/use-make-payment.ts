"use client";

import { useMutation } from "@tanstack/react-query";
import { makePayment } from "@/lib/actions/payment.actions";

export function useMakePayment() {
  return useMutation({
    mutationFn: makePayment,
  });
}
