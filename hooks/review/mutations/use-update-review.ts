"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReview } from "@/lib/actions/review.actions";

export function useUpdateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReview,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });

      queryClient.invalidateQueries({
        queryKey: ["review"],
      });
    },
  });
}
