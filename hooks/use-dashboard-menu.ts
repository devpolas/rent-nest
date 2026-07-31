import { dashboardMenu } from "@/config/client/dashboard-menu";
import type { DashboardRole } from "@/config/client/dashboard-menu";

export function useDashboardMenu(role: DashboardRole) {
  return dashboardMenu[role];
}
