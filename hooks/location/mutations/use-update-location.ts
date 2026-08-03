"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLocation } from "@/lib/actions/location.actions";

export function useUpdateLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLocation,

    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        queryKey: ["locations"],
      });

      queryClient.invalidateQueries({
        queryKey: ["location", variables.id],
      });
    },
  });
}
