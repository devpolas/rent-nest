"use client";
import { useQuery } from "@tanstack/react-query";
import { getPropertyDetails } from "@/lib/actions/property.actions";
import { PropertyDetailsMap } from "@/types/property";

export function usePropertyDetail<T extends keyof PropertyDetailsMap>(
  detailsAction: T,
  id?: string,
) {
  return useQuery({
    queryKey: ["property-detail", detailsAction, id],

    queryFn: () =>
      getPropertyDetails({
        detailsAction,
        id: id!,
      }),

    enabled: !!id,
  });
}
