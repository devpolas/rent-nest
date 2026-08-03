import { LocationType } from "@/types/enum";

import {
  Briefcase,
  Building2,
  Home,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

type LocationTypeConfig = {
  icon: LucideIcon;
  label: string;
  className: string;
};

const LOCATION_TYPE_CONFIG: Record<LocationType, LocationTypeConfig> = {
  HOME: {
    icon: Home,
    label: "Home",
    className: "text-brand",
  },

  CURRENT: {
    icon: MapPin,
    label: "Current Location",
    className: "text-brand-success",
  },

  WORK: {
    icon: Briefcase,
    label: "Work",
    className: "text-orange-500",
  },

  PROPERTY: {
    icon: Building2,
    label: "Property",
    className: "text-violet-500",
  },
};

type LocationTypeBadgeProps = {
  type: LocationType;
};

export function LocationTypeBadge({ type }: LocationTypeBadgeProps) {
  const config = LOCATION_TYPE_CONFIG[type];

  const Icon = config.icon;

  return (
    <Badge variant='outline' className='gap-2 px-3 py-1 rounded-full'>
      <Icon className={cn("size-4", config.className)} />
      <span>{config.label}</span>
    </Badge>
  );
}
