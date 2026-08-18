"use client";

import { CalendarCheck, CheckCircle2, Heart, ShieldCheck } from "lucide-react";

import type { PropertyResponse } from "@/types/property";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heading3, Label, Muted } from "@/components/typography/typography";

import { usePropertyRentalRequest } from "@/hooks/use-property-rental-request";
import PropertyRentalRequestButton from "./rental-request/rental-request-button";
import PropertyRentalRequestDialog from "./rental-request/rental-request-dialog";

type Props = {
  property: PropertyResponse;
};

export default function PropertyBookingCard({ property }: Props) {
  const {
    existingRentalRequest,
    hasExistingRequest,
    isCheckingStatus,
    dialogOpen,
    setDialogOpen,
    handleRentalRequest,
  } = usePropertyRentalRequest(property.id);

  const isAvailable = property.availability === "AVAILABLE";

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
            <PropertyRentalRequestButton
              availability={property.availability}
              rentalRequestId={existingRentalRequest?.id}
              rentalRequestStatus={existingRentalRequest?.status}
              isCheckingStatus={isCheckingStatus}
              onRequest={() => handleRentalRequest(property.availability)}
              className='w-full'
            />

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

      <PropertyRentalRequestDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        propertyId={property.id}
        propertyTitle={property.title}
        rent={Number(property.rent)}
      />
    </>
  );
}
