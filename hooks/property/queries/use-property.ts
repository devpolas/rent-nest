import { useQuery } from "@tanstack/react-query";
import { getPropertyById } from "@/lib/actions/property.actions";

export function useProperty(id?: string) {
  return useQuery({
    queryKey: ["property", id],

    queryFn: () =>
      getPropertyById({
        id: id!,
      }),

    enabled: !!id,
  });
}
