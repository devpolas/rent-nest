import { RentalRequestStatus } from "./enums";

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
