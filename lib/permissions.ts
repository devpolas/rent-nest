import type { DashboardRole } from "@/config/client/dashboard-menu";

export const rolePermissions = {
  /**
   * Tenant:
   * - Browse properties
   * - Request rental
   * - Pay rent
   * - Review rented properties
   */
  TENANT: [
    "VIEW_PROPERTIES",

    "CREATE_RENTAL_REQUEST",

    "VIEW_RENTAL_REQUEST",

    "CANCEL_RENTAL_REQUEST",

    "MAKE_PAYMENT",

    "VIEW_PAYMENT_HISTORY",

    "CREATE_REVIEW",

    "UPDATE_REVIEW",

    "DELETE_REVIEW",

    "VIEW_MESSAGES",
  ],

  /**
   * Landlord:
   * - Manage own properties
   * - Manage rental requests
   * - Receive payments
   */
  LANDLORD: [
    "CREATE_PROPERTY",

    "UPDATE_PROPERTY",

    "DELETE_PROPERTY",

    "VIEW_OWN_PROPERTIES",

    "MANAGE_REQUEST",

    "APPROVE_RENTAL_REQUEST",

    "REJECT_RENTAL_REQUEST",

    "VIEW_PAYMENT",

    "VIEW_REVIEWS",

    "VIEW_MESSAGES",
  ],

  /**
   * Admin:
   * Platform control only
   */
  ADMIN: [
    "MANAGE_USERS",

    "MANAGE_PROPERTIES",

    "MANAGE_CATEGORIES",

    "MANAGE_AMENITIES",

    "MANAGE_FEATURES",

    "MANAGE_RULES",

    "MANAGE_PAYMENTS",

    "MANAGE_REVIEWS",

    "MANAGE_REPORTS",

    "MANAGE_SYSTEM",
  ],
} satisfies Record<DashboardRole, readonly string[]>;

export function hasPermission(role: DashboardRole, permission: string) {
  return rolePermissions[role].includes(permission);
}
