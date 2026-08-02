import { z } from "zod";

// User enum

export const UserRoleEnum = z.enum([
  "TENANT",
  "LANDLORD",
  "MODERATOR",
  "ADMIN",
]);

export const UserStatusEnum = z.enum([
  "ACTIVE",
  "DEACTIVATE",
  "BLOCKED",
  "BANNED",
]);

// Create / Update User

export const UserSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  phone: z.string().optional(),
  avatar: z.url().optional(),
});

export const UserUpdateSchema = UserSchema.partial();

// Admin fields
export const AdminUserSchema = UserSchema.extend({
  role: UserRoleEnum.optional(),
  status: UserStatusEnum.optional(),
});

export const ProfileSchema = z.object({
  profileImage: z.string().optional(),
  bio: z.string().max(1000).optional(),
  birthdate: z.coerce.date().optional(),
});

export const ProfileUpdateSchema = z.object({
  profileImage: z.string().optional(),

  bio: z.string().max(1000).optional(),

  birthdate: z.coerce.date().optional(),
});

export const SocialPlatformSchema = z.enum([
  "GITHUB",
  "LINKEDIN",
  "FACEBOOK",
  "TWITTER",
  "INSTAGRAM",
  "YOUTUBE",
  "DISCORD",
  "TELEGRAM",
  "WHATSAPP",
  "WEBSITE",
]);

export const SocialProfileCreateSchema = z.object({
  platform: SocialPlatformSchema,
  url: z.url(),
});

export const SocialProfileUpdateSchema = z.object({
  url: z.url(),
});

export type SocialProfileCreateInput = z.infer<
  typeof SocialProfileCreateSchema
>;

export type SocialProfileUpdateInput = z.infer<
  typeof SocialProfileUpdateSchema
>;

export type ProfileInputType = z.infer<typeof ProfileSchema>;

export type ProfileUpdateInputType = z.infer<typeof ProfileUpdateSchema>;

export type UserInputType = z.infer<typeof UserSchema>;
export type UserUpdateInputType = z.infer<typeof UserUpdateSchema>;
export type AdminUserInputType = z.infer<typeof AdminUserSchema>;
