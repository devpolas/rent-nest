"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSocialProfile } from "@/lib/actions/user.actions";

export function useDeleteSocialProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSocialProfile,

    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });

      queryClient.removeQueries({
        queryKey: ["social-profile", variables.id],
      });
    },
  });
}
