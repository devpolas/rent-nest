"use client";

import { deleteReview } from "@/lib/actions/review.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReview,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
    },
  });
}
