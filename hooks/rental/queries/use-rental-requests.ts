"use client";

import { getRentalRequestById } from "@/lib/actions/rental.actions";
import { useQuery } from "@tanstack/react-query";

export function useRentalRequest(id: string) {
  return useQuery({
    queryKey: ["rentals", id],
    queryFn: () => getRentalRequestById({ id }),
    enabled: !!id,
  });
}
