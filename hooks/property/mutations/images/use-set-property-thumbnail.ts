"use client";
import { setPropertyThumbnail } from "@/lib/actions/property-client.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
