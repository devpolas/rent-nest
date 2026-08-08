"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrUpdateProfile } from "@/lib/actions/user.actions";

export function useCreateOrUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrUpdateProfile,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
}
