"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserProfile } from "@/lib/actions/user.actions";

export function useCreateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserProfile,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
}
