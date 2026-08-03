import { dashboardMenu } from "@/config/dashboard-menu";
import type { DashboardRole } from "@/config/dashboard-menu";

export function useDashboardMenu(role: DashboardRole) {
  return dashboardMenu[role];
}
