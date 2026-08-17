import { UserRole } from "@/types/enum";

export const dashboardRoutes: Record<UserRole, string> = {
  [UserRole.TENANT]: "/dashboard/tenant",
  [UserRole.LANDLORD]: "/dashboard/landlord",
  [UserRole.ADMIN]: "/dashboard/admin",
};

export function getDashboardPath(role: UserRole): string {
  return dashboardRoutes[role];
}

export function hasRouteAccess(role: UserRole, pathname: string): boolean {
  const dashboardPath = dashboardRoutes[role];

  if (!dashboardPath) {
    return false;
  }

  return pathname === dashboardPath || pathname.startsWith(`${dashboardPath}/`);
}
