"use client";

import { CalendarCheck, CheckCircle2, Heart, ShieldCheck } from "lucide-react";
import type { PropertyResponse } from "@/types/property";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heading3, Label, Muted } from "@/components/typography/typography";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/auth/use-auth";
import { useState } from "react";
import { toast } from "sonner";
import { ReusableDialog } from "../dialog/dialog";
import RentalRequest from "./rental-request/rental-request";
import ActionButton from "../button/action-button";
import { useRentalRequests } from "@/hooks";
import { RentalRequestStatus } from "@/types/enum";

type Props = {
  property: PropertyResponse;
};

const BLOCKING_RENTAL_STATUSES: RentalRequestStatus[] = [
  RentalRequestStatus.PENDING,
  RentalRequestStatus.APPROVED,
  RentalRequestStatus.PAYMENT_PENDING,
  RentalRequestStatus.ACTIVE,
];

export default function PropertyBookingCard({ property }: Props) {
  const router = useRouter();

  const { isAuthenticated, isLoading: authLoading, user } = useAuth();

  const [dialog, setDialog] = useState(false);

  const { data: rentalRequestsResponse, isLoading: rentalsLoading } =
    useRentalRequests();

  const rentalRequests = rentalRequestsResponse?.data?.rents ?? [];

  const existingRentalRequest = rentalRequests.find(
    (request) =>
      request.propertyId === property.id &&
      BLOCKING_RENTAL_STATUSES.includes(request.status),
  );

  const hasExistingRequest = Boolean(existingRentalRequest);
  const isRented = property.availability === "RENTED";
  const isAvailable = property.availability === "AVAILABLE";

  const canRequestRental = isAvailable && !isRented && !hasExistingRequest;

  const isCheckingStatus = authLoading || rentalsLoading;

  function handleRentalRequest() {
    if (!isAuthenticated) {
      const callbackUrl = encodeURIComponent(
        `/properties/property/${property.id}`,
      );

      router.push(`/signin?callbackUrl=${callbackUrl}`);
      return;
    }

    if (user?.role !== "TENANT") {
      toast.error("Only tenant accounts can request a rental property.");
      return;
    }

    if (isRented) {
      toast.error("This property has already been rented.");
      return;
    }

    if (hasExistingRequest) {
      toast.info(
        "You already have an active rental request for this property.",
      );
      return;
    }

    if (!isAvailable) {
      toast.error("This property is currently unavailable.");
      return;
    }

    setDialog(true);
  }

  function handleCloseDialog() {
    setDialog(false);
  }

  let requestButtonText = "Request Rental";

  if (isRented) {
    requestButtonText = "Already Rented";
  } else if (hasExistingRequest) {
    requestButtonText = "Request Already Sent";
  } else if (!isAvailable) {
    requestButtonText = "Currently Unavailable";
  }

  return (
    <>
      <Card className='glass-card'>
        <CardContent className='space-y-6 p-6'>
          <div>
            <Muted>Daily Rent</Muted>

            <div className='flex items-end gap-2 mt-1'>
              <Heading3 className='text-brand'>
                ৳{Number(property.rent).toLocaleString()}
              </Heading3>

              <Muted>/day</Muted>
            </div>
          </div>

          <div className='flex items-center gap-3 p-4 rounded-xl glass'>
            <div
              className={
                isAvailable
                  ? "bg-brand-success/10 p-2 rounded-lg"
                  : "bg-muted p-2 rounded-lg"
              }
            >
              <CalendarCheck
                className={
                  isAvailable
                    ? "size-5 text-brand-success"
                    : "size-5 text-muted-foreground"
                }
              />
            </div>

            <div>
              <Muted>Availability</Muted>
              <Label>{property.availability}</Label>
            </div>
          </div>

          {hasExistingRequest && existingRentalRequest && (
            <div className='flex items-start gap-3 bg-brand/5 p-4 rounded-xl'>
              <CheckCircle2 className='mt-0.5 size-5 text-brand' />

              <div>
                <Label>Rental Request Exists</Label>

                <Muted className='mt-1'>
                  Your request is currently{" "}
                  <span className='font-medium text-foreground'>
                    {existingRentalRequest.status
                      .toLowerCase()
                      .replaceAll("_", " ")}
                  </span>
                  .
                </Muted>
              </div>
            </div>
          )}

          <div className='space-y-3'>
            <ActionButton
              disabled={!canRequestRental || isCheckingStatus}
              isLoading={isCheckingStatus}
              onClick={handleRentalRequest}
              variant='outline'
              size='lg'
              className='w-full'
              loadingText='Checking...'
            >
              {requestButtonText}
            </ActionButton>

            <Button size='lg' variant='outline' className='w-full'>
              <Heart className='mr-2 size-4' />
              Save Property
            </Button>
          </div>

          <div className='flex items-start gap-3 bg-brand/5 p-4 rounded-xl'>
            <ShieldCheck className='mt-0.5 size-5 text-brand' />

            <Muted>
              Your request is secure. The landlord will review and approve your
              rental request.
            </Muted>
          </div>
        </CardContent>
      </Card>

      <ReusableDialog isOpen={dialog} onOpenChange={setDialog}>
        <RentalRequest
          propertyId={property.id}
          propertyTitle={property.title}
          rent={Number(property.rent)}
          handleClose={handleCloseDialog}
        />
      </ReusableDialog>
    </>
  );
}
