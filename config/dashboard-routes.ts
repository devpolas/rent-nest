import { UserRole } from "@/types/enum";
import { dashboardMenu } from "./dashboard-menu";

export const dashboardRoutes: Record<UserRole, string[]> = Object.fromEntries(
  Object.entries(dashboardMenu).map(([role, menu]) => {
    const urls = [
      ...menu.navMain.map((item) => item.url),
      ...menu.navClouds.flatMap((group) => group.items.map((item) => item.url)),
      ...menu.navSecondary.map((item) => item.url),
      ...menu.documents.map((item) => item.url),
    ];

    return [role, urls];
  }),
) as Record<UserRole, string[]>;

// user case
// const routes = dashboardRoutes[user.role].includes(pathname);
