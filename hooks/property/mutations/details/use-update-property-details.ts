import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePropertyDetails } from "@/lib/actions/property.actions";
import { PropertyDetailsMap } from "@/types/property";
import { PropertyDetailsUpdateType } from "@/schemas/property.schema";

type UpdatePropertyDetailsVariables = {
  id: string;
  detailsAction: keyof PropertyDetailsMap;
  payload: PropertyDetailsUpdateType;
};

export function useUpdatePropertyDetails() {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, UpdatePropertyDetailsVariables>({
    mutationFn: (variables) =>
      updatePropertyDetails({
        id: variables.id,
        detailsAction: variables.detailsAction,
        payload: variables.payload,
      }),

    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        queryKey: ["property-details", variables.detailsAction],
      });
    },
  });
}
