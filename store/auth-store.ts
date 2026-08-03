"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { MeResponse } from "@/types/user";
import { getSession, logout } from "@/lib/actions/auth.actions";
import { getMe } from "@/lib/actions/user.actions";

interface AuthState {
  user: MeResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // actions
  checkAuth: () => Promise<void>;
  setUser: (user: MeResponse | null) => void;
  clearAuth: () => void;
  logoutUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  immer((set, get) => ({
    user: null,
    error: null,
    isAuthenticated: false,
    isLoading: true,

    setUser: (user) =>
      set((state) => {
        state.user = user;
        state.isAuthenticated = !!user;
        state.isLoading = false;
        state.error = null;
      }),

    clearAuth: () =>
      set((state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      }),

    checkAuth: async () => {
      // 1. If user is already loaded, ensure isLoading is false and skip fetch
      const { user } = get();
      if (user) {
        set((state) => {
          state.isLoading = false;
        });
        return;
      }

      try {
        set((state) => {
          state.isLoading = true;
          state.error = null;
        });

        /**
         * 2. Check JWT cookie session
         */
        const session = await getSession();
        if (!session) {
          set((state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
          });
          return;
        }

        /**
         * 3. Fetch current user
         */
        const response = await getMe();
        if (response.success && response.data?.user) {
          set((state) => {
            state.user = response.data!.user;
            state.isAuthenticated = true;
            state.isLoading = false;
          });
        } else {
          set((state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = response.message ?? "Failed to fetch";
          });
        }
      } catch (err) {
        set((state) => {
          state.user = null;
          state.isAuthenticated = false;
          state.isLoading = false;
          state.error =
            err instanceof Error ? err.message : "Authentication failed";
        });
      }
    },

    logoutUser: async () => {
      try {
        await logout();
      } finally {
        set((state) => {
          state.user = null;
          state.isAuthenticated = false;
          state.isLoading = false;
          state.error = null;
        });
      }
    },
  })),
);
