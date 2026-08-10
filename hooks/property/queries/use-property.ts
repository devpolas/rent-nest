"use client";
import { getPropertyById } from "@/lib/actions/property-client.actions";
import { useQuery } from "@tanstack/react-query";

export function useProperty(id?: string) {
  return useQuery({
    queryKey: ["property", id],

    queryFn: () =>
      getPropertyById({
        id: id!,
      }),

    enabled: !!id,
  });
}
