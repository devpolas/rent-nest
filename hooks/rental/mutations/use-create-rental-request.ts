"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRentalRequest } from "@/lib/actions/rental.actions";

export function useCreateRentalRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRentalRequest,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rentals"],
      });
    },
  });
}
