import type { ReactNode } from "react";

import {
  ChartBar,
  CircleHelp,
  CreditCard,
  FileText,
  Heart,
  Home,
  LayoutDashboard,
  MessageCircle,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Users,
  Layers,
  Sparkles,
  Wallet,
  HomeIcon,
  User,
} from "lucide-react";

import { UserRole } from "@/types/enum";

export interface SidebarItem {
  title: string;
  url: string;
  icon: ReactNode;
}

export interface DashboardSidebar {
  navMain: SidebarItem[];
  navSecondary: SidebarItem[];
}

const commonSecondary: SidebarItem[] = [
  {
    title: "Home",
    url: "/",
    icon: <HomeIcon />,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: <Settings />,
  },
  {
    title: "Help Center",
    url: "/help",
    icon: <CircleHelp />,
  },
];

export const dashboardMenu: Record<UserRole, DashboardSidebar> = {
  /**
   * TENANT
   * User who rents properties
   */
  TENANT: {
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard/tenant",
        icon: <LayoutDashboard />,
      },

      {
        title: "Explore Properties",
        url: "/properties",
        icon: <Search />,
      },

      {
        title: "Favorites",
        url: "/dashboard/tenant/favorites",
        icon: <Heart />,
      },

      {
        title: "Rental Requests",
        url: "/dashboard/tenant/requests",
        icon: <FileText />,
      },

      {
        title: "Payments",
        url: "/dashboard/tenant/payments",
        icon: <CreditCard />,
      },

      {
        title: "Reviews",
        url: "/dashboard/tenant/reviews",
        icon: <Star />,
      },

      {
        title: "Messages",
        url: "/dashboard/tenant/messages",
        icon: <MessageCircle />,
      },

      {
        title: "Profile",
        url: "/dashboard/tenant/profile",
        icon: <User />,
      },
    ],

    navSecondary: commonSecondary,
  },

  /**
   * LANDLORD
   * Property owner
   */
  LANDLORD: {
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard/landlord",
        icon: <LayoutDashboard />,
      },

      {
        title: "My Properties",
        url: "/dashboard/landlord/properties",
        icon: <Home />,
      },

      {
        title: "Add Property",
        url: "/dashboard/landlord/properties/create",
        icon: <Plus />,
      },

      {
        title: "Rental Requests",
        url: "/dashboard/landlord/requests",
        icon: <FileText />,
      },

      {
        title: "Payments",
        url: "/dashboard/landlord/payments",
        icon: <Wallet />,
      },

      {
        title: "Analytics",
        url: "/dashboard/landlord/analytics",
        icon: <ChartBar />,
      },

      {
        title: "Reviews",
        url: "/dashboard/landlord/reviews",
        icon: <Star />,
      },

      {
        title: "Messages",
        url: "/dashboard/landlord/messages",
        icon: <MessageCircle />,
      },

      {
        title: "Profile",
        url: "/dashboard/landlord/profile",
        icon: <User />,
      },
    ],

    navSecondary: commonSecondary,
  },

  /**
   * ADMIN
   * Platform management
   */
  ADMIN: {
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard/admin",
        icon: <LayoutDashboard />,
      },

      {
        title: "Analytics",
        url: "/dashboard/landlord/analytics",
        icon: <ChartBar />,
      },

      {
        title: "Users",
        url: "/dashboard/admin/users",
        icon: <Users />,
      },

      {
        title: "Properties",
        url: "/dashboard/admin/properties",
        icon: <Home />,
      },

      {
        title: "Categories",
        url: "/dashboard/admin/categories",
        icon: <Layers />,
      },

      {
        title: "Amenities",
        url: "/dashboard/admin/amenities",
        icon: <Sparkles />,
      },

      {
        title: "Features",
        url: "/dashboard/admin/features",
        icon: <ShieldCheck />,
      },

      {
        title: "Rules",
        url: "/dashboard/admin/rules",
        icon: <FileText />,
      },

      {
        title: "Rental Requests",
        url: "/dashboard/admin/requests",
        icon: <FileText />,
      },

      {
        title: "Payments",
        url: "/dashboard/admin/payments",
        icon: <CreditCard />,
      },
      {
        title: "Reviews",
        url: "/dashboard/admin/reviews",
        icon: <Star />,
      },
      {
        title: "Reports",
        url: "/dashboard/admin/reports",
        icon: <ChartBar />,
      },
      {
        title: "Messages",
        url: "/dashboard/admin/messages",
        icon: <MessageCircle />,
      },
      {
        title: "Profile",
        url: "/dashboard/admin/profile",
        icon: <User />,
      },
    ],

    navSecondary: commonSecondary,
  },
};
