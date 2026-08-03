"use client";

import { useAuthStore } from "@/store/auth-store";
import { useEffect } from "react";

export default function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  const checkAuth = useAuthStore((state) => state.checkAuth);
  const logoutUser = useAuthStore((state) => state.logoutUser);

  // Auto-run checkAuth when component mounts
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,

    // Synchronous action callers for UI handlers
    logout: logoutUser,
    refetch: checkAuth,
  };
}
