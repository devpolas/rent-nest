"use client";

import { logoutDeviceBySessionId } from "@/lib/actions/account.actions";
import { useMutation } from "@tanstack/react-query";

export function useLogoutDevice() {
  return useMutation({
    mutationFn: logoutDeviceBySessionId,
  });
}
