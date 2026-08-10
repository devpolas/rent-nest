"use client";
import { getPropertyImages } from "@/lib/actions/property-client.actions";
import { useQuery } from "@tanstack/react-query";

export function usePropertyImages(propertyId?: string) {
  return useQuery({
    queryKey: ["property-images", propertyId],

    queryFn: () =>
      getPropertyImages({
        propertyId: propertyId!,
      }),

    enabled: !!propertyId,
  });
}
