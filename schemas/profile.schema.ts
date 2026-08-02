import * as z from "zod";

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
