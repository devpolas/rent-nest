import * as z from "zod";

export const PropertySchema = z.object({
  title: z.string().min(10),
  description: z.string().min(15),
  rent: z.number().positive(),
  securityDeposit: z.number().nonnegative(),
  bedrooms: z.number().int().positive(),
  bathrooms: z.number().int().positive(),
  area: z.number().positive(),
  availableFrom: z.coerce.date(),
  availability: z
    .enum(["AVAILABLE", "RESERVED", "RENTED", "UNAVAILABLE"])
    .optional(),
  status: z
    .enum(["PENDING", "APPROVED", "REJECTED", "RENTED", "ARCHIVED"])
    .optional(),
  images: z.array(z.url()).min(1),
  categoryId: z.uuid(),
  amenities: z.array(z.uuid()).min(1),
  features: z.array(z.uuid()).min(1),
  rules: z.array(z.uuid()).min(1),
});

export const PropertyUpdateSchema = z.object({
  title: z.string().min(10).optional(),
  description: z.string().min(15).optional(),
  rent: z.number().positive().optional(),
  securityDeposit: z.number().nonnegative().optional(),
  bedrooms: z.number().int().positive().optional(),
  bathrooms: z.number().int().positive().optional(),
  area: z.number().positive().optional(),
  availableFrom: z.coerce.date().optional(),
  availability: z
    .enum(["AVAILABLE", "RESERVED", "RENTED", "UNAVAILABLE"])
    .optional(),
  status: z
    .enum(["PENDING", "APPROVED", "REJECTED", "RENTED", "ARCHIVED"])
    .optional(),
  images: z.array(z.url()).optional(),
  categoryId: z.uuid().optional(),
  amenities: z.array(z.uuid()).min(1).optional(),
  features: z.array(z.uuid()).min(1).optional(),
  rules: z.array(z.uuid()).min(1).optional(),
});

export const PropertyAdminUpdateSchema = z.object({
  landlordId: z.uuid().optional(),
});

export const PropertyQuerySchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  categoryId: z.string().optional(),
  country: z.string().optional(),
  division: z.string().optional(),
  district: z.string().optional(),
  city: z.string().optional(),
  village: z.string().optional(),
  minRent: z.string().optional(),
  maxRent: z.string().optional(),
  minArea: z.string().optional(),
  maxArea: z.string().optional(),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  availability: z
    .enum(["AVAILABLE", "RESERVED", "RENTED", "UNAVAILABLE"])
    .optional(),
  status: z
    .enum(["PENDING", "APPROVED", "REJECTED", "RENTED", "ARCHIVED"])
    .optional(),
  amenityIds: z.array(z.uuid()).optional(),
  featureIds: z.array(z.uuid()).optional(),
  ruleIds: z.array(z.uuid()).optional(),
  minRating: z.string().optional(),
  minReviews: z.string().optional(),
  sortBy: z
    .enum([
      "createdAt",
      "rent",
      "area",
      "bedrooms",
      "bathrooms",
      "averageRating",
      "reviewCount",
    ])
    .optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});

export const PropertyDetailsSchema = z.object({
  name: z.string().min(1).max(100),
  icon: z.string().optional(),
});

export const PropertyDetailsUpdateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  icon: z.string().optional(),
});

export type PropertyInputType = z.infer<typeof PropertySchema>;
export type PropertyUpdateInputType = z.infer<typeof PropertyUpdateSchema>;
export type PropertyUpdateAdminInputType = z.infer<
  typeof PropertyAdminUpdateSchema
>;

export type PropertyDetailsType = z.infer<typeof PropertyDetailsSchema>;
export type PropertyDetailsUpdateType = z.infer<
  typeof PropertyDetailsUpdateSchema
>;

export type PropertyQuery = z.infer<typeof PropertyQuerySchema>;
