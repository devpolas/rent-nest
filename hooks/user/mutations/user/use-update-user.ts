"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserById } from "@/lib/actions/user.actions";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserById,

    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user", variables.id],
      });
    },
  });
}
