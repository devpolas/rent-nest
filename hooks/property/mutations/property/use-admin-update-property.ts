"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePropertyByAdmin } from "@/lib/actions/property.actions";

export function useAdminUpdateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePropertyByAdmin,

    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        queryKey: ["properties"],
      });

      queryClient.invalidateQueries({
        queryKey: ["property", variables.id],
      });
    },
  });
}
