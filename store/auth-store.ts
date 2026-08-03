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
  immer((set) => ({
    user: null,
    error: null,
    isAuthenticated: false,
    isLoading: true,

    setUser: (user) =>
      set((state) => {
        state.user = user;
        state.isAuthenticated = !!user;
        state.isLoading = false;
      }),

    clearAuth: () =>
      set((state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      }),

    checkAuth: async () => {
      try {
        set((state) => {
          state.isLoading = true;
        });
        /**
         * Check JWT cookie session
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
         * Fetch current user
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
      } catch {
        set((state) => {
          state.user = null;
          state.isAuthenticated = false;
          state.isLoading = false;
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
        });
      }
    },
  })),
);
