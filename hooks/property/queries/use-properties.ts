"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllProperties } from "@/lib/actions/property.actions";
import { PropertyQuery } from "@/schemas/property.schema";

export function useProperties(query?: PropertyQuery) {
  return useQuery({
    queryKey: ["properties", query],

    queryFn: () =>
      getAllProperties({
        payload: query,
      }),
  });
}
