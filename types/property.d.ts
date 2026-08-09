import { AvailabilityStatus, PropertyStatus } from "./enums";
import { Location } from "./location";
import { PropertyImage } from "./property-image";

interface Landlord {
  id: string;
  name: string;
  email: string;
  avatar: string;
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

interface PropertyDetail {
  id: string;
  name: string;
  slug: string;
  icon: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface Category extends PropertyDetail {
  categoryNo: number;
}
export interface Amenity extends PropertyDetail {
  amenityNo: number;
}
export interface Feature extends PropertyDetail {
  featureNo: number;
}
export interface Rule extends PropertyDetail {
  ruleNo: number;
}

interface PropertyAminity {
  id: string;
  propertyId: string;
  amenityId: string;
  createdAt: string;
  updatedAt: string;
  amenity: Amenity;
}
interface PropertyFeature {
  id: string;
  propertyId: string;
  amenityId: string;
  createdAt: string;
  updatedAt: string;
  feature: Feature;
}

interface PropertyRule {
  id: string;
  propertyId: string;
  amenityId: string;
  createdAt: string;
  updatedAt: string;
  rule: Rule;
}

export interface PropertyManagementResponse extends Property {
  images: PropertyImage[];
  category: PropertyCategory;
  location: Location | null;
  landlord: Landlord;
  amenities: PropertyAminity[];
  features: PropertyFeature[];
  rules: PropertyRule[];
}

/**
 * Public property should only be used when
 * the property is complete enough for public display.
 */
export interface PropertyResponse extends Omit<
  PropertyManagementResponse,
  "location"
> {
  location: Location;
}

export type PropertyDetailsMap = {
  categories: {
    category: Category;
  };
  amenities: {
    amenity: Amenity;
  };
  features: {
    feature: Feature;
  };
  rules: {
    rule: Rule;
  };
};
export type AllPropertyDetailsMap = {
  categories: {
    categories: Category[];
  };
  amenities: {
    amenities: Amenity[];
  };
  features: {
    features: Feature[];
  };
  rules: {
    rules: Rule[];
  };
};
