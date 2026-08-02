import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePropertyImage } from "@/lib/actions/property.actions";

export function useDeletePropertyImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePropertyImage,

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
