import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePropertyById } from "@/lib/actions/property.actions";

export function useDeleteProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePropertyById,

    onSuccess(_, variables) {
      queryClient.removeQueries({
        queryKey: ["property", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["properties"],
      });
    },
  });
}
