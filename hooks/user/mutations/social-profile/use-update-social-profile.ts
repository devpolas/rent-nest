"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSocialProfile } from "@/lib/actions/user.actions";

export function useUpdateSocialProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSocialProfile,

    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });

      queryClient.invalidateQueries({
        queryKey: ["social-profile", variables.id],
      });
    },
  });
}
