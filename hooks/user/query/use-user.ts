"use client";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/lib/actions/user.actions";

export function useUser(id?: string) {
  return useQuery({
    queryKey: ["user", id],

    queryFn: () =>
      getUserById({
        id: id!,
      }),

    enabled: !!id,
  });
}
