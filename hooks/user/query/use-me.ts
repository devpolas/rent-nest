import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/lib/actions/user.actions";

export function useMe() {
  return useQuery({
    queryKey: ["me"],

    queryFn: getMe,
  });
}
