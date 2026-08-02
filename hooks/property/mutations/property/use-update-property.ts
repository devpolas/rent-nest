import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProperty } from "@/lib/actions/property.actions";

export function useUpdateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProperty,

    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        queryKey: ["properties"],
      });

      queryClient.invalidateQueries({
        queryKey: ["property", variables.id],
      });
    },
  });
}
