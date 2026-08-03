"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRentalRequestByOwnerOrAdmin } from "@/lib/actions/rental.actions";

export function useUpdateRentalRequestByOwner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRentalRequestByOwnerOrAdmin,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["rentals"],
      });

      queryClient.invalidateQueries({
        queryKey: ["rentals", variables.id],
      });
    },
  });
}
