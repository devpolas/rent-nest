import { RentalRequestStatus } from "./enums";

export interface PropertyRentalResponse {
  id: string;
  title: string;
  rent: string;
  securityDeposit: string;
}

export interface RentalTenantResponse {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}

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
  tenant: RentalTenantResponse;
  property: PropertyRentalResponse;
}
