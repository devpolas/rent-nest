"use client";

import { CalendarDays, CreditCard, Wallet } from "lucide-react";
import type { PropertyResponse } from "@/types/property";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heading3, Label, Muted } from "@/components/typography/typography";

type Props = {
  property: PropertyResponse;
};

export default function PropertyPriceCard({ property }: Props) {
  return (
    <Card className='glass-card'>
      <CardContent className='space-y-6 p-6'>
        {/* Price */}
        <div className='flex flex-wrap justify-between items-end gap-4'>
          <div>
            <Muted>Daily Rent</Muted>

            <div className='flex items-end gap-2 mt-1'>
              <Heading3 className='text-brand'>
                ৳{property.rent.toLocaleString()}
              </Heading3>

              <Muted>/day</Muted>
            </div>
          </div>

          <div className='bg-brand-success/10 px-4 py-2 rounded-full'>
            <Label className='text-brand-success'>
              {property.availability}
            </Label>
          </div>
        </div>

        <Separator />

        {/* Details */}
        <div className='gap-4 grid sm:grid-cols-2'>
          <PriceItem
            icon={CreditCard}
            label='Security Deposit'
            value={`৳${property.securityDeposit.toLocaleString()}`}
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

        {/* Actions */}
        <div className='flex sm:flex-row flex-col gap-3'>
          <Button variant='outline' size='lg' className='flex-1'>
            Request Rental
          </Button>

          <Button variant='outline' size='lg' className='flex-1'>
            Save Property
          </Button>
        </div>

        <Muted className='text-center'>
          Your rental request will be sent to the landlord for approval.
        </Muted>
      </CardContent>
    </Card>
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
