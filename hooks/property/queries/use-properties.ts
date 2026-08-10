"use client";
import { useQuery } from "@tanstack/react-query";
import { PropertyQuery } from "@/schemas/property.schema";
import { getAllProperties } from "@/lib/actions/property-client.actions";

export function useProperties(query?: PropertyQuery) {
  return useQuery({
    queryKey: ["properties", query],

    queryFn: () =>
      getAllProperties({
        payload: query,
      }),
  });
}
