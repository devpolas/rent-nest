"use client";

import { XCircle } from "lucide-react";
import { toast } from "sonner";

import ActionButton from "@/components/button/action-button";
import { useDeleteRentalRequest } from "@/hooks";
import { RentalRequestStatus } from "@/types/enum";
import RentalRequestPaymentButton from "./rental-request-payment-button";

interface PropertyRentalRequestButtonProps {
  availability: string;
  rentalRequestId?: string;
  rentalRequestStatus?: RentalRequestStatus;
  isCheckingStatus: boolean;
  onRequest: () => void;
  className?: string;
}

export default function PropertyRentalRequestButton({
  availability,
  rentalRequestId,
  rentalRequestStatus,
  isCheckingStatus,
  onRequest,
  className,
}: PropertyRentalRequestButtonProps) {
  const deleteMutation = useDeleteRentalRequest();

  const isRented = availability === "RENTED";
  const isAvailable = availability === "AVAILABLE";

  const hasRentalRequest =
    Boolean(rentalRequestId) && Boolean(rentalRequestStatus);

  const isPending = rentalRequestStatus === RentalRequestStatus.PENDING;

  const isApproved = rentalRequestStatus === RentalRequestStatus.APPROVED;

  const isPaymentPending =
    rentalRequestStatus === RentalRequestStatus.PAYMENT_PENDING;

  const isActive = rentalRequestStatus === RentalRequestStatus.ACTIVE;

  const isCancelled = rentalRequestStatus === RentalRequestStatus.CANCELLED;

  const isRejected = rentalRequestStatus === RentalRequestStatus.REJECTED;

  async function handleCancel() {
    if (!rentalRequestId) {
      toast.error("Rental request ID is missing.");
      return;
    }

    try {
      const response = await deleteMutation.mutateAsync({
        id: rentalRequestId,
      });

      if (!response.success) {
        toast.error(response.message || "Failed to cancel rental request.");
        return;
      }

      toast.success(
        response.message || "Rental request cancelled successfully.",
      );
    } catch {
      toast.error("Failed to cancel rental request.");
    }
  }

  if (isCheckingStatus) {
    return (
      <ActionButton
        type='button'
        disabled
        isLoading
        loadingText='Checking...'
        variant='outline'
        size='lg'
        className={className}
      >
        Checking...
      </ActionButton>
    );
  }

  if (isRented) {
    return (
      <ActionButton
        type='button'
        disabled
        variant='outline'
        size='lg'
        className={className}
      >
        Already Rented
      </ActionButton>
    );
  }

  if (isActive) {
    return (
      <ActionButton
        type='button'
        disabled
        variant='outline'
        size='lg'
        className={className}
      >
        Rental Active
      </ActionButton>
    );
  }

  if (isApproved && rentalRequestId) {
    return (
      <RentalRequestPaymentButton
        rentRequestId={rentalRequestId}
        variant='action'
        size='lg'
        className={className}
      />
    );
  }

  if (hasRentalRequest && (isPending || isPaymentPending)) {
    return (
      <ActionButton
        type='button'
        variant='outline'
        size='lg'
        className={className}
        disabled={deleteMutation.isPending}
        isLoading={deleteMutation.isPending}
        loadingText='Cancelling...'
        onClick={() => void handleCancel()}
      >
        <XCircle className='mr-2 size-4' />
        Cancel Request
      </ActionButton>
    );
  }

  if (isCancelled) {
    return (
      <ActionButton
        type='button'
        disabled={!isAvailable}
        variant='outline'
        size='lg'
        className={className}
        onClick={onRequest}
      >
        {isAvailable ? "Request Rental" : "Currently Unavailable"}
      </ActionButton>
    );
  }

  if (isRejected) {
    return (
      <ActionButton
        type='button'
        disabled={!isAvailable}
        variant='outline'
        size='lg'
        className={className}
        onClick={onRequest}
      >
        {isAvailable ? "Request Again" : "Currently Unavailable"}
      </ActionButton>
    );
  }

  if (hasRentalRequest) {
    return (
      <ActionButton
        type='button'
        disabled
        variant='outline'
        size='lg'
        className={className}
      >
        Request Already Sent
      </ActionButton>
    );
  }

  if (!isAvailable) {
    return (
      <ActionButton
        type='button'
        disabled
        variant='outline'
        size='lg'
        className={className}
      >
        Currently Unavailable
      </ActionButton>
    );
  }

  return (
    <ActionButton
      type='button'
      onClick={onRequest}
      variant='outline'
      size='lg'
      className={className}
    >
      Request Rental
    </ActionButton>
  );
}
