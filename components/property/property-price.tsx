"use client";

import { CalendarDays, CheckCircle2, CreditCard } from "lucide-react";
import type { PropertyResponse } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heading3, Label, Muted } from "@/components/typography/typography";
import useAuth from "@/hooks/auth/use-auth";
import ActionButton from "../button/action-button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ReusableDialog } from "../dialog/dialog";
import RentalRequest from "./rental-request/rental-request";
import { toast } from "sonner";
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

export default function PropertyPriceCard({ property }: Props) {
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
          <div className='flex flex-wrap justify-between items-end gap-4'>
            <div>
              <Muted>Daily Rent</Muted>

              <div className='flex items-end gap-2 mt-1'>
                <Heading3 className='text-brand'>
                  ৳{Number(property.rent).toLocaleString()}
                </Heading3>

                <Muted>/day</Muted>
              </div>
            </div>

            <div
              className={
                isAvailable
                  ? "bg-brand-success/10 px-4 py-2 rounded-full"
                  : "bg-muted px-4 py-2 rounded-full"
              }
            >
              <Label
                className={
                  isAvailable ? "text-brand-success" : "text-muted-foreground"
                }
              >
                {property.availability}
              </Label>
            </div>
          </div>

          <Separator />

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

          <div className='gap-4 grid sm:grid-cols-2'>
            <PriceItem
              icon={CreditCard}
              label='Security Deposit'
              value={`৳${Number(property.securityDeposit).toLocaleString()}`}
            />

            <PriceItem
              icon={CalendarDays}
              label='Available From'
              value={new Date(
                property.availableFrom as string,
              ).toLocaleDateString()}
            />
          </div>

          <Separator />

          <div className='flex sm:flex-row flex-col gap-3'>
            <ActionButton
              disabled={!canRequestRental || isCheckingStatus}
              isLoading={isCheckingStatus}
              onClick={handleRentalRequest}
              variant='outline'
              size='lg'
              className='flex-1'
              loadingText='Checking...'
            >
              {requestButtonText}
            </ActionButton>

            <Button variant='outline' size='lg' className='flex-1'>
              Save Property
            </Button>
          </div>

          <Muted className='text-center'>
            Your rental request will be sent to the landlord for approval.
          </Muted>
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

type PriceItemProps = {
  icon: React.ElementType;
  label: string;
  value: string;
};

function PriceItem({ icon: Icon, label, value }: PriceItemProps) {
  return (
    <div className='flex items-start gap-3 p-4 rounded-xl glass'>
      <div className='bg-brand/10 p-2 rounded-lg'>
        <Icon className='size-4 text-brand' />
      </div>

      <div className='space-y-1'>
        <Muted>{label}</Muted>
        <Label>{value}</Label>
      </div>
    </div>
  );
}
