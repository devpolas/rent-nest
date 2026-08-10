"use client";

import { getReviewsByPropertyId } from "@/lib/actions/review-client.actions";
import { useQuery } from "@tanstack/react-query";

export function usePropertyReviews(propertyId: string) {
  return useQuery({
    queryKey: ["reviews", propertyId],
    queryFn: () => getReviewsByPropertyId({ propertyId }),
    enabled: !!propertyId,
  });
}
