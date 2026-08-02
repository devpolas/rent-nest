import { Property } from "./property";

export interface Review {
  id: string;

  tenantId: string;
  propertyId: string;

  rating: number;
  comment: string;

  createdAt: string;
  updatedAt: string;
}

export interface ReviewResponse extends Review {
  property: PropertyReviewResponse;

  tenant: ReviewTenantResponse;
}

export interface PropertyReviewResponse extends Property {
  _?: boolean;
}

export interface ReviewTenantResponse {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}
