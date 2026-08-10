"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getMe } from "@/lib/actions/user.actions";
import { logout } from "@/lib/actions/account.actions";

export const AUTH_QUERY_KEY = ["currentUser"];

export default function useAuth() {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: AUTH_QUERY_KEY,

    queryFn: async () => {
      const response = await getMe();

      if (!response.success || !response.data?.user) {
        return null;
      }

      return response.data.user;
    },

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,

    retry: false,

    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const logoutMutation = useMutation({
    mutationFn: logout,

    onSuccess: () => {
      queryClient.setQueryData(AUTH_QUERY_KEY, null);

      queryClient.removeQueries({
        queryKey: AUTH_QUERY_KEY,
      });
    },
  });

  /**
   * Force an authentication refresh.
   *
   * Important after signin because the query may
   * currently contain null from before authentication.
   */
  const refreshUser = async () => {
    const result = await refetch({
      throwOnError: false,
    });

    return result.data ?? null;
  };

  return {
    user: user ?? null,

    isAuthenticated: !!user,

    isLoading,
    isFetching,

    error: error ? error.message : null,

    refetchUser: refreshUser,

    logout: logoutMutation.mutateAsync,

    isLoggingOut: logoutMutation.isPending,
  };
}
