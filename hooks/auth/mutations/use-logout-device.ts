"use client";

import { logoutDeviceBySessionId } from "@/lib/actions/auth.actions";
import { useMutation } from "@tanstack/react-query";

export function useLogoutDevice() {
  return useMutation({
    mutationFn: logoutDeviceBySessionId,
  });
}
