"use client";
import { logoutFromOtherDevices } from "@/lib/actions/account.actions";
import { useMutation } from "@tanstack/react-query";

export function useLogoutOtherDevices() {
  return useMutation({
    mutationFn: logoutFromOtherDevices,
  });
}
