import { Amenity } from "./amenity";
import { AvailabilityStatus, PropertyStatus } from "./enums";
import { Feature } from "./feature";
import { Location } from "./location";
import { PropertyCategory } from "./property-category";
import { PropertyImage } from "./property-image";
import { Rule } from "./rule";

interface Landlord {
  id: string;
  name: string;
  email: string;
}

export interface Property {
  id: string;

  title: string;
  description: string;
  slug: string;

  rent: string;
  securityDeposit: string;

  bedrooms: number;
  bathrooms: number;
  area: string;

  availableFrom: string | null;

  availability: AvailabilityStatus;
  status: PropertyStatus;

  averageRating: number;
  reviewCount: number;
  totalRating: number;
  reviews: number;

  locationId: string;
  landlordId: string;
  categoryId: string;

  createdAt: string;
  updatedAt: string;
}

export interface PropertyResponse extends Property {
  images: PropertyImage[];
  category: PropertyCategory;
  location: Location;
  landlord: Landlord;
  amenities: Amenity[];
  features: Feature[];
  rules: Rule[];
}
