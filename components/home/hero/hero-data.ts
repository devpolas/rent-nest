import {
  Building2,
  Home,
  Landmark,
  MapPin,
  ShieldCheck,
  Star,
  Users,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type HeroSlide = {
  id: number;
  image: string;
  title: string;
  subtitle: string;
};

export type HeroStat = {
  id: number;
  icon: LucideIcon;
  value: string;
  label: string;
};

export type HeroFeature = {
  id: number;
  icon: LucideIcon;
  title: string;
};

export type HeroQuickCategory = {
  id: number;
  icon: LucideIcon;
  name: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: "/images/hero/apartment.jpg",
    title: "Find Your Perfect Home",
    subtitle: "Verified apartments from trusted landlords.",
  },
  {
    id: 2,
    image: "/images/hero/villa.jpg",
    title: "Premium Villas",
    subtitle: "Luxury living in your favorite locations.",
  },
  {
    id: 3,
    image: "/images/hero/office.jpg",
    title: "Commercial Spaces",
    subtitle: "Modern offices for growing businesses.",
  },
  {
    id: 4,
    image: "/images/hero/family.jpg",
    title: "Comfort For Every Family",
    subtitle: "Discover spacious homes across Bangladesh.",
  },
];

export const heroStats: HeroStat[] = [
  {
    id: 1,
    icon: Home,
    value: "1,500+",
    label: "Properties",
  },
  {
    id: 2,
    icon: Users,
    value: "500+",
    label: "Landlords",
  },
  {
    id: 3,
    icon: Star,
    value: "4.9",
    label: "Average Rating",
  },
  {
    id: 4,
    icon: ShieldCheck,
    value: "100%",
    label: "Verified Listings",
  },
];

export const heroFeatures: HeroFeature[] = [
  {
    id: 1,
    icon: ShieldCheck,
    title: "Verified Listings",
  },
  {
    id: 2,
    icon: Zap,
    title: "Instant Requests",
  },
  {
    id: 3,
    icon: Landmark,
    title: "Secure Payments",
  },
  {
    id: 4,
    icon: Star,
    title: "Trusted Reviews",
  },
];

export const heroQuickCategories: HeroQuickCategory[] = [
  {
    id: 1,
    icon: Building2,
    name: "Apartment",
  },
  {
    id: 2,
    icon: Home,
    name: "House",
  },
  {
    id: 3,
    icon: Landmark,
    name: "Office",
  },
  {
    id: 4,
    icon: MapPin,
    name: "Commercial",
  },
];
