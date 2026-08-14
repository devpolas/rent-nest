import { RentalRequestStatus } from "./enums";
import { PropertyReviewResponse, ReviewTenantResponse } from "./review";

export interface RentalRequest {
  id: string;

  tenantId: string;
  landlordId: string;
  propertyId: string;

  message: string;

  moveInDate: string;
  leaseDays: number;

  status: RentalRequestStatus;

  createdAt: string;
  updatedAt: string;
}

export interface RentalRequestResponse extends RentalRequest {
  tenant: ReviewTenantResponse;
  property: PropertyReviewResponse;
}
