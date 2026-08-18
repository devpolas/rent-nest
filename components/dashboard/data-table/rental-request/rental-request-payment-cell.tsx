"use client";

import RentalRequestPaymentButton from "./rental-request-payment-button";
import { RentalRequestStatus } from "@/types/enum";
import type { RentalRequestResponse } from "@/types/rental-request";

interface RentalRequestPaymentCellProps {
  rentalRequest: RentalRequestResponse;
}

export default function RentalRequestPaymentCell({
  rentalRequest,
}: RentalRequestPaymentCellProps) {
  switch (rentalRequest.status) {
    case RentalRequestStatus.APPROVED:
      return (
        <RentalRequestPaymentButton
          rentRequestId={rentalRequest.id}
          variant='action'
          size='sm'
        />
      );

    case RentalRequestStatus.PAYMENT_PENDING:
      return (
        <span className='text-muted-foreground text-sm'>
          Payment Processing
        </span>
      );

    case RentalRequestStatus.ACTIVE:
      return (
        <span className='font-medium text-brand-success text-sm'>Paid</span>
      );

    default:
      return <span className='text-muted-foreground text-sm'>—</span>;
  }
}
