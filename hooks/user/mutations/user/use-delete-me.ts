import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMe } from "@/lib/actions/user.actions";

export function useDeleteMe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMe,

    onSuccess() {
      queryClient.removeQueries({
        queryKey: ["me"],
      });
    },
  });
}
