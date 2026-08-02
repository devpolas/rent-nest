import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLocation } from "@/lib/actions/location.actions";

export function useDeleteLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLocation,

    onSuccess(_, variables) {
      queryClient.removeQueries({
        queryKey: ["location", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["locations"],
      });
    },
  });
}
