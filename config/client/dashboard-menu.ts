import {
  LayoutDashboard,
  Search,
  Heart,
  FileText,
  CreditCard,
  Star,
  MessageCircle,
  User,
  Settings,
  Home,
  Plus,
  ChartBar,
  Wallet,
  Users,
  Layers,
  Sparkles,
  ShieldCheck,
  Flag,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
export type DashboardRole = "TENANT" | "LANDLORD" | "ADMIN";

export interface DashboardMenuItem {
  title: string;

  href: string;

  icon: LucideIcon;
}

export const dashboardMenu: Record<DashboardRole, DashboardMenuItem[]> = {
  /**
   * Normal customer
   * Can rent properties
   */
  TENANT: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },

    {
      title: "Explore Properties",
      href: "/properties",
      icon: Search,
    },

    {
      title: "Favorites",
      href: "/dashboard/favorites",
      icon: Heart,
    },

    {
      title: "Rental Requests",
      href: "/dashboard/requests",
      icon: FileText,
    },

    {
      title: "Payments",
      href: "/dashboard/payments",
      icon: CreditCard,
    },

    {
      title: "Reviews",
      href: "/dashboard/reviews",
      icon: Star,
    },

    {
      title: "Messages",
      href: "/dashboard/messages",
      icon: MessageCircle,
    },

    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },

    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ],

  /**
   * Property owner
   * Can manage rental properties
   */
  LANDLORD: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },

    {
      title: "My Properties",
      href: "/dashboard/properties",
      icon: Home,
    },

    {
      title: "Add Property",
      href: "/dashboard/properties/create",
      icon: Plus,
    },

    {
      title: "Rental Requests",
      href: "/dashboard/requests",
      icon: FileText,
    },

    {
      title: "Payments",
      href: "/dashboard/payments",
      icon: Wallet,
    },

    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: ChartBar,
    },

    {
      title: "Reviews",
      href: "/dashboard/reviews",
      icon: Star,
    },

    {
      title: "Messages",
      href: "/dashboard/messages",
      icon: MessageCircle,
    },

    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },

    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ],

  /**
   * Platform administrator
   *
   * IMPORTANT:
   * ADMIN is not tenant/landlord.
   * Only manages system.
   */
  ADMIN: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },

    {
      title: "Users",
      href: "/dashboard/users",
      icon: Users,
    },

    {
      title: "Properties",
      href: "/dashboard/properties",
      icon: Home,
    },

    {
      title: "Categories",
      href: "/dashboard/categories",
      icon: Layers,
    },

    {
      title: "Amenities",
      href: "/dashboard/amenities",
      icon: Sparkles,
    },

    {
      title: "Features",
      href: "/dashboard/features",
      icon: ShieldCheck,
    },

    {
      title: "Rules",
      href: "/dashboard/rules",
      icon: FileText,
    },

    {
      title: "Rental Requests",
      href: "/dashboard/requests",
      icon: FileText,
    },

    {
      title: "Payments",
      href: "/dashboard/payments",
      icon: CreditCard,
    },

    {
      title: "Reviews",
      href: "/dashboard/reviews",
      icon: Star,
    },

    {
      title: "Reports",
      href: "/dashboard/reports",
      icon: Flag,
    },

    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ],
};
