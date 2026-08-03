"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setPropertyThumbnail } from "@/lib/actions/property.actions";

export function useSetPropertyThumbnail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setPropertyThumbnail,

    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        queryKey: ["property-images", variables.propertyId],
      });

      queryClient.invalidateQueries({
        queryKey: ["property", variables.propertyId],
      });
    },
  });
}
