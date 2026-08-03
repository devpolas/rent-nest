"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ReviewInputType } from "@/schemas/review.schema";
import { createReview } from "@/lib/actions/review.actions";

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.propertyId],
      });

      queryClient.invalidateQueries({
        queryKey: ["reviews", "admin"],
      });
    },
  });
}
