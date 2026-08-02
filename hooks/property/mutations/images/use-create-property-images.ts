import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPropertyImages } from "@/lib/actions/property.actions";

export function useCreatePropertyImages() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPropertyImages,

    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        queryKey: ["property-images", variables.propertyId],
      });

      queryClient.invalidateQueries({
        queryKey: ["property", variables.propertyId],
      });
    },
  });
}
