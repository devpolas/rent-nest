import * as z from "zod";

export const LocationTypeSchema = z.enum([
  "HOME",
  "CURRENT",
  "WORK",
  "PROPERTY",
]);

export const LocationBaseSchema = z.object({
  latitude: z.string().optional(),
  longitude: z.string().optional(),

  country: z.string().min(1).max(100),
  division: z.string().min(1).max(100),
  district: z.string().min(1).max(100),
  city: z.string().min(1).max(100),
  village: z.string().min(1).max(100),

  postalCode: z.string().min(1).max(20),

  addressLine: z.string().optional(),
});

/**
 * Fields actually used by the LocationForm.
 */
export const LocationFormSchema = LocationBaseSchema.extend({
  type: LocationTypeSchema,
});

export type LocationFormValues = z.infer<typeof LocationFormSchema>;

/**
 * API create schema.
 */
export const LocationCreateSchema = LocationBaseSchema.extend({
  type: LocationTypeSchema,

  profileId: z.string().uuid().optional(),
  propertyId: z.string().uuid().optional(),
}).superRefine((data, ctx) => {
  if (data.type !== "PROPERTY" && !data.profileId) {
    ctx.addIssue({
      code: "custom",
      path: ["profileId"],
      message: "Profile id is required for user location.",
    });
  }

  if (data.type === "PROPERTY" && !data.propertyId) {
    ctx.addIssue({
      code: "custom",
      path: ["propertyId"],
      message: "Property id is required for property location.",
    });
  }

  if (data.type === "PROPERTY" && data.profileId) {
    ctx.addIssue({
      code: "custom",
      path: ["profileId"],
      message: "PROPERTY locations cannot have a profileId.",
    });
  }

  if (data.type !== "PROPERTY" && data.propertyId) {
    ctx.addIssue({
      code: "custom",
      path: ["propertyId"],
      message: "User locations cannot have a propertyId.",
    });
  }
});

export const LocationUpdateSchema = LocationBaseSchema.partial().extend({
  type: LocationTypeSchema.optional(),
});

export type LocationCreateInput = z.infer<typeof LocationCreateSchema>;

export type LocationUpdateInput = z.infer<typeof LocationUpdateSchema>;
