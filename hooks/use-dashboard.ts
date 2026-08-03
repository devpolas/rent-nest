"use client";

import { dashboardMenu } from "@/config/dashboard-menu";
import { useAuthStore } from "@/store/auth-store";

export function useDashboardMenu() {
  const user = useAuthStore((s) => s.user);
  if (!user) return [];
  return dashboardMenu[user.role];
}
