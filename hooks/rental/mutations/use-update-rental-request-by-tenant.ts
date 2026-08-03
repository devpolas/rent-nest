"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { RentalRequestTenantUpdateType } from "@/schemas/rental.schema";
import { updateRentalRequestByTenant } from "@/lib/actions/rental.actions";

export function useUpdateRentalRequestByTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRentalRequestByTenant,

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
