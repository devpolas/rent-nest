"use client";

import { logoutFromOtherDevices } from "@/lib/actions/auth.actions";
import { useMutation } from "@tanstack/react-query";

export function useLogoutOtherDevices() {
  return useMutation({
    mutationFn: logoutFromOtherDevices,
  });
}
