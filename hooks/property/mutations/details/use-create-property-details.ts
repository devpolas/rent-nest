"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPropertyDetails } from "@/lib/actions/property.actions";
import { PropertyDetailsMap } from "@/types/property";
import { ApiResponse } from "@/types/response";
import { PropertyDetailsType } from "@/schemas/property.schema";

type CreatePropertyDetailsVariables = {
  detailsAction: keyof PropertyDetailsMap;
  payload: PropertyDetailsType;
};

export function useCreatePropertyDetails() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<unknown | null>,
    Error,
    CreatePropertyDetailsVariables
  >({
    mutationFn: (variables) =>
      createPropertyDetails({
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
