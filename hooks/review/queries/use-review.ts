"use client";
import { getReviewById } from "@/lib/actions/review-client.actions";
import { useQuery } from "@tanstack/react-query";

export function useReview(id: string) {
  return useQuery({
    queryKey: ["review", id],
    queryFn: () => getReviewById({ id }),
    enabled: !!id,
  });
}
