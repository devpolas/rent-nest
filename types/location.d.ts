import { LocationType } from "./enum";

export interface Location {
  id: string;

  latitude: string | null;
  longitude: string | null;

  type: LocationType;

  country: string;
  division: string;
  district: string;
  city: string;
  village: string;
  postalCode: string;

  addressLine: string | null;

  profileId?: string;
  propertyId?: string;

  createdAt: string;
  updatedAt: string;
}
