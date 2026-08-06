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

export interface PropertyReviewResponse {
  id: string;
  title: string;
}

export interface ReviewTenantResponse {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}

export interface ReviewResponse extends Review {
  property: PropertyReviewResponse;
  tenant: ReviewTenantResponse;
}
