"use client";

import { logout } from "@/lib/actions/account.actions";
import { useMutation } from "@tanstack/react-query";

export function useLogout() {
  return useMutation({
    mutationFn: logout,
  });
}
