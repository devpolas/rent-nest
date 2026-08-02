import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/lib/actions/user.actions";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],

    queryFn: getAllUsers,
  });
}
