// hooks/use-auth.ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMe } from "@/lib/actions/user.actions";
import { logout } from "@/lib/actions/auth.actions";
export const AUTH_QUERY_KEY = ["currentUser"];

export default function useAuth() {
  const queryClient = useQueryClient();

  // 1. Fetch User Profile
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: async () => {
      const res = await getMe();
      if (!res.success || !res.data?.user) {
        return null;
      }
      return res.data.user;
    },
    staleTime: 1000 * 60 * 5, // ⚡ Fresh for 5 minutes: ZERO refetches during this window!
    gcTime: 1000 * 60 * 30, // Retained in memory for 30 minutes
    retry: false, // Don't retry endlessly if unauthenticated (401)
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // 2. Logout Mutation
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Instantly clear user from query cache
      queryClient.setQueryData(AUTH_QUERY_KEY, null);
    },
  });

  return {
    user: user ?? null,
    isAuthenticated: !!user,
    isLoading: isLoading,
    error: error ? error.message : null,
    refetchUser: refetch,
    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,
  };
}
