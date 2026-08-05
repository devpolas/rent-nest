"use client";

import { dashboardMenu, DashboardSidebar } from "@/config/dashboard-menu";
import useAuth from "../auth/use-auth";

export function useDashboardMenu(): DashboardSidebar | null {
  const { user } = useAuth();
  if (!user) return null;
  return dashboardMenu[user.role];
}
