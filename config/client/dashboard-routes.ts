import { dashboardMenu } from "./dashboard-menu";

export const dashboardRoutes = Object.fromEntries(
  Object.entries(dashboardMenu).map(([role, items]) => [
    role,
    items.map((item) => item.href),
  ]),
);