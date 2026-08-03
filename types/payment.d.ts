export interface PaymentHistory {
  id: string;
  amount: number;
  currency: string;
  status: "PENDING" | "SUCCESS" | "FAILED";
  provider: "STRIPE";
  transactionId: string;
  expireIn: string | null;
  createdAt: string;
  updatedAt: string;

  property: {
    id: string;
    title: string;
    rent: number;
    images: string[];
  };

  tenant: {
    id: string;
    name: string;
    email: string;
  };

  landlord: {
    id: string;
    name: string;
    email: string;
  };
}
