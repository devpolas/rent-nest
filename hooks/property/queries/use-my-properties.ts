import { getMyAllProperties } from "@/lib/actions/property.actions";
import { useQuery } from "@tanstack/react-query";

export function useMyProperties() {
  return useQuery({
    queryKey: ["my-properties"],
    queryFn: getMyAllProperties,
  });
}
