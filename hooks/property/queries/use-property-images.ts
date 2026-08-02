import { useQuery } from "@tanstack/react-query";
import { getPropertyImages } from "@/lib/actions/property.actions";

export function usePropertyImages(propertyId?: string) {
  return useQuery({
    queryKey: ["property-images", propertyId],

    queryFn: () =>
      getPropertyImages({
        propertyId: propertyId!,
      }),

    enabled: !!propertyId,
  });
}
