"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserById } from "@/lib/actions/user.actions";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserById,

    onSuccess(_, variables) {
      queryClient.removeQueries({
        queryKey: ["user", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}
