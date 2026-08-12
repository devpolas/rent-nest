import { UserRole } from "@/types/enum";
import { dashboardMenu } from "./dashboard-menu";

export const dashboardRoutes: Record<UserRole, string[]> = Object.fromEntries(
  Object.entries(dashboardMenu).map(([role, menu]) => {
    const urls = [
      ...menu.navMain.map((item) => item.url),
      ...menu.navSecondary.map((item) => item.url),
    ];

    return [role, urls];
  }),
) as Record<UserRole, string[]>;

export function hasRouteAccess(role: UserRole, pathname: string): boolean {
  const routes = dashboardRoutes[role] ?? [];

  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}
