"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useRentalRequests } from "@/hooks";
import { RentalRequestStatus, UserRole } from "@/types/enum";
import useAuth from "@/hooks/auth/use-auth";

const BLOCKING_RENTAL_STATUSES: RentalRequestStatus[] = [
  RentalRequestStatus.PENDING,
  RentalRequestStatus.APPROVED,
  RentalRequestStatus.PAYMENT_PENDING,
  RentalRequestStatus.ACTIVE,
];

export function usePropertyRentalRequest(propertyId: string) {
  const router = useRouter();

  const { isAuthenticated, isLoading: authLoading, user } = useAuth();

  const [dialogOpen, setDialogOpen] = useState(false);

  const { data, isLoading: rentalsLoading } = useRentalRequests();

  const rentalRequests = data?.data?.rents ?? [];

  const existingRentalRequest = rentalRequests.find(
    (request) =>
      request.propertyId === propertyId &&
      BLOCKING_RENTAL_STATUSES.includes(request.status),
  );

  const hasExistingRequest = Boolean(existingRentalRequest);

  const isCheckingStatus = authLoading || rentalsLoading;

  function handleRentalRequest(availability: string) {
    if (!isAuthenticated) {
      const callbackUrl = encodeURIComponent(
        `/properties/property/${propertyId}`,
      );

      router.push(`/signin?callbackUrl=${callbackUrl}`);
      return;
    }

    if (user?.role !== UserRole.TENANT) {
      toast.error("Only tenant accounts can request a rental property.");
      return;
    }

    if (availability === "RENTED") {
      toast.error("This property has already been rented.");
      return;
    }

    if (hasExistingRequest) {
      toast.info(
        "You already have an active rental request for this property.",
      );
      return;
    }

    if (availability !== "AVAILABLE") {
      toast.error("This property is currently unavailable.");
      return;
    }

    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
  }

  return {
    existingRentalRequest,
    hasExistingRequest,
    isCheckingStatus,
    dialogOpen,
    setDialogOpen,
    closeDialog,
    handleRentalRequest,
  };
}
