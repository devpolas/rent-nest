"use client";
import { useQuery } from "@tanstack/react-query";
import { AllPropertyDetailsMap } from "@/types/property";
import { getAllPropertyDetails } from "@/lib/actions/property-client.actions";

export function useAllPropertyDetails<T extends keyof AllPropertyDetailsMap>(
  detailsAction: T,
) {
  return useQuery({
    queryKey: ["property-details", detailsAction],

    queryFn: () =>
      getAllPropertyDetails({
        detailsAction,
      }),
  });
}
