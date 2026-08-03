"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSocialProfile } from "@/lib/actions/user.actions";

export function useCreateSocialProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSocialProfile,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
}
