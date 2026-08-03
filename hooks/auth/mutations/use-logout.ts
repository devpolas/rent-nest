"use client";

import { logout } from "@/lib/actions/auth.actions";
import { useMutation } from "@tanstack/react-query";

export function useLogout() {
  return useMutation({
    mutationFn: logout,
  });
}
