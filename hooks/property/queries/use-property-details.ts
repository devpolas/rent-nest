"use client";
import { useQuery } from "@tanstack/react-query";
import { PropertyDetailsMap } from "@/types/property";
import { getPropertyDetails } from "@/lib/actions/property-client.actions";

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
