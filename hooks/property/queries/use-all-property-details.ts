import { useQuery } from "@tanstack/react-query";
import { getAllPropertyDetails } from "@/lib/actions/property.actions";
import { AllPropertyDetailsMap } from "@/types/property";

export function useAllPropertyDetails<T extends keyof AllPropertyDetailsMap>(
  detailsAction: T,
) {
  return useQuery({
    queryKey: ["property-details", detailsAction],

    queryFn: () =>
      getAllPropertyDetails({
        detailsAction,
      }),
  });
}
