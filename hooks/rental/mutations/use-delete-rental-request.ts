"use client";

import { deleteRentalRequest } from "@/lib/actions/rental.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteRentalRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRentalRequest,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rentals"],
      });
    },
  });
}
