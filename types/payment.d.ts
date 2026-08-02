import { PaymentStatus } from "./enums";

export interface Payment {
  id: string;

  amount: string;
  currency: string;

  provider: string;
  transactionId: string;

  expireIn: string;

  status: PaymentStatus;

  propertyId: string;

  tenantId: string;
  landlordId: string;

  createdAt: string;
  updatedAt: string;
}

export interface PaymentTenantResponse {
  id: string;
  name: string;
  email: string;
}
