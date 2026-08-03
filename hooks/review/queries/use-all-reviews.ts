"use client";

import { getAllReviews } from "@/lib/actions/review.actions";
import { useQuery } from "@tanstack/react-query";

export function useAllReviews() {
  return useQuery({
    queryKey: ["reviews", "admin"],
    queryFn: getAllReviews,
  });
}
