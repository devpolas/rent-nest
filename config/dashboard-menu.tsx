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
        url: "/dashboard",
        icon: <LayoutDashboard />,
      },

      {
        title: "Explore Properties",
        url: "/properties",
        icon: <Search />,
      },

      {
        title: "Favorites",
        url: "/dashboard/favorites",
        icon: <Heart />,
      },

      {
        title: "Rental Requests",
        url: "/dashboard/requests",
        icon: <FileText />,
      },

      {
        title: "Payments",
        url: "/dashboard/payments",
        icon: <CreditCard />,
      },

      {
        title: "Reviews",
        url: "/dashboard/reviews",
        icon: <Star />,
      },

      {
        title: "Messages",
        url: "/dashboard/messages",
        icon: <MessageCircle />,
      },

      {
        title: "Profile",
        url: "/dashboard/profile",
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
        url: "/dashboard",
        icon: <LayoutDashboard />,
      },

      {
        title: "My Properties",
        url: "/dashboard/properties",
        icon: <Home />,
      },

      {
        title: "Add Property",
        url: "/dashboard/properties/create",
        icon: <Plus />,
      },

      {
        title: "Rental Requests",
        url: "/dashboard/requests",
        icon: <FileText />,
      },

      {
        title: "Payments",
        url: "/dashboard/payments",
        icon: <Wallet />,
      },

      {
        title: "Analytics",
        url: "/dashboard/analytics",
        icon: <ChartBar />,
      },

      {
        title: "Reviews",
        url: "/dashboard/reviews",
        icon: <Star />,
      },

      {
        title: "Messages",
        url: "/dashboard/messages",
        icon: <MessageCircle />,
      },

      {
        title: "Profile",
        url: "/dashboard/profile",
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
        url: "/dashboard",
        icon: <LayoutDashboard />,
      },

      {
        title: "Users",
        url: "/dashboard/users",
        icon: <Users />,
      },

      {
        title: "Properties",
        url: "/dashboard/properties",
        icon: <Home />,
      },

      {
        title: "Categories",
        url: "/dashboard/categories",
        icon: <Layers />,
      },

      {
        title: "Amenities",
        url: "/dashboard/amenities",
        icon: <Sparkles />,
      },

      {
        title: "Features",
        url: "/dashboard/features",
        icon: <ShieldCheck />,
      },

      {
        title: "Rules",
        url: "/dashboard/rules",
        icon: <FileText />,
      },

      {
        title: "Rental Requests",
        url: "/dashboard/requests",
        icon: <FileText />,
      },

      {
        title: "Payments",
        url: "/dashboard/payments",
        icon: <CreditCard />,
      },

      {
        title: "Reports",
        url: "/dashboard/reports",
        icon: <ChartBar />,
      },
    ],

    navSecondary: commonSecondary,
  },
};
