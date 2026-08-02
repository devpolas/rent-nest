import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePropertyDetails } from "@/lib/actions/property.actions";
import { PropertyDetailsMap } from "@/types/property";

type DeletePropertyDetailsVariables = {
  detailsAction: keyof PropertyDetailsMap;
  id: string;
};

export function useDeletePropertyDetails() {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, DeletePropertyDetailsVariables>({
    mutationFn: (variables) =>
      deletePropertyDetails({
        detailsAction: variables.detailsAction,
        id: variables.id,
      }),

    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        queryKey: ["property-details", variables.detailsAction],
      });
    },
  });
}
