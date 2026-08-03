"use client";

import { getRentalRequests } from "@/lib/actions/rental.actions";
import { useQuery } from "@tanstack/react-query";

export function useRentalRequests() {
  return useQuery({
    queryKey: ["rentals"],
    queryFn: getRentalRequests,
  });
}
