"use client";

import { CalendarDays, CheckCircle2, CreditCard } from "lucide-react";

import type { PropertyResponse } from "@/types/property";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Heading3, Label, Muted } from "@/components/typography/typography";

import { usePropertyRentalRequest } from "@/hooks/use-property-rental-request";
import PropertyRentalRequestButton from "./rental-request/rental-request-button";
import PropertyRentalRequestDialog from "./rental-request/rental-request-dialog";

type Props = {
  property: PropertyResponse;
};

export default function PropertyPriceCard({ property }: Props) {
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
            <PropertyRentalRequestButton
              availability={property.availability}
              rentalRequestId={existingRentalRequest?.id}
              rentalRequestStatus={existingRentalRequest?.status}
              isCheckingStatus={isCheckingStatus}
              onRequest={() => handleRentalRequest(property.availability)}
              className='flex-1'
            />

            <Button variant='outline' size='lg' className='flex-1'>
              Save Property
            </Button>
          </div>

          <Muted className='text-center'>
            Your rental request will be sent to the landlord for approval.
          </Muted>
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
