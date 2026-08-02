import * as z from "zod";

export const LocationSchema = z.object({
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  type: z.enum(["PROPERTY"]).default("PROPERTY"),
  country: z.string().min(1),
  division: z.string().min(1),
  district: z.string().min(1),
  city: z.string().min(1),
  village: z.string().min(1),
  postalCode: z.string().min(1),
  addressLine: z.string().optional(),
});

export const LocationUpdateSchema = z.object({
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  country: z.string().min(1).optional(),
  division: z.string().min(1).optional(),
  district: z.string().min(1).optional(),
  city: z.string().min(1).optional(),
  village: z.string().min(1).optional(),
  postalCode: z.string().min(1).optional(),
  addressLine: z.string().optional().optional(),
});

export type LocationInputType = z.infer<typeof LocationSchema>;
export type LocationUpdateInputType = z.infer<typeof LocationUpdateSchema>;
