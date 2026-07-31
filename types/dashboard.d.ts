import type { DashboardRole } from "@/config/client/dashboard-menu";

declare global {
  interface DashboardUser {
    id: string;

    name: string;

    email: string;

    role: DashboardRole;
  }
}

export {};
