export const UserStatus = {
  ACTIVE: "ACTIVE",
  DEACTIVATE: "DEACTIVATE",
  BLOCKED: "BLOCKED",
  BANNED: "BANNED",
} as const;

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export const AuthProvider = {
  LOCAL: "LOCAL",
  GOOGLE: "GOOGLE",
  GITHUB: "GITHUB",
  FACEBOOK: "FACEBOOK",
  APPLE: "APPLE",
  MICROSOFT: "MICROSOFT",
} as const;

export type AuthProvider = (typeof AuthProvider)[keyof typeof AuthProvider];

export const UserRole = {
  TENANT: "TENANT",
  LANDLORD: "LANDLORD",
  ADMIN: "ADMIN",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const SocialPlatform = {
  GITHUB: "GITHUB",
  LINKEDIN: "LINKEDIN",
  FACEBOOK: "FACEBOOK",
  TWITTER: "TWITTER",
  INSTAGRAM: "INSTAGRAM",
  YOUTUBE: "YOUTUBE",
  DISCORD: "DISCORD",
  TELEGRAM: "TELEGRAM",
  WHATSAPP: "WHATSAPP",
  WEBSITE: "WEBSITE",
} as const;

export type SocialPlatform =
  (typeof SocialPlatform)[keyof typeof SocialPlatform];

export const LocationType = {
  HOME: "HOME",
  CURRENT: "CURRENT",
  WORK: "WORK",
  PROPERTY: "PROPERTY",
} as const;

export type LocationType = (typeof LocationType)[keyof typeof LocationType];

export const PropertyStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  RENTED: "RENTED",
  ARCHIVED: "ARCHIVED",
} as const;

export type PropertyStatus =
  (typeof PropertyStatus)[keyof typeof PropertyStatus];

export const AvailabilityStatus = {
  AVAILABLE: "AVAILABLE",
  RESERVED: "RESERVED",
  RENTED: "RENTED",
  UNAVAILABLE: "UNAVAILABLE",
} as const;

export type AvailabilityStatus =
  (typeof AvailabilityStatus)[keyof typeof AvailabilityStatus];

export const RentalRequestStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  PAYMENT_PENDING: "PAYMENT_PENDING",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  EXPIRED: "EXPIRED",
} as const;

export type RentalRequestStatus =
  (typeof RentalRequestStatus)[keyof typeof RentalRequestStatus];

export const PaymentStatus = {
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
  CANCELLED: "CANCELLED",
  EXPIRED: "EXPIRED",
  REFUNDED: "REFUNDED",
} as const;

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
