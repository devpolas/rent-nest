import { CalendarCheck, Heart, ShieldCheck } from "lucide-react";
import type { PropertyResponse } from "@/types/property";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heading3, Label, Muted } from "@/components/typography/typography";

type Props = {
  property: PropertyResponse;
};

export default function PropertyBookingCard({ property }: Props) {
  return (
    <Card className='glass-card'>
      <CardContent className='space-y-6 p-6'>
        {/* Price */}
        <div>
          <Muted>Daily Rent</Muted>

          <div className='flex items-end gap-2 mt-1'>
            <Heading3 className='text-brand'>
              ৳{Number(property.rent).toLocaleString()}
            </Heading3>

            <Muted>/month</Muted>
          </div>
        </div>

        {/* Availability */}
        <div className='flex items-center gap-3 p-4 rounded-xl glass'>
          <div className='bg-brand-success/10 p-2 rounded-lg'>
            <CalendarCheck className='size-5 text-brand-success' />
          </div>

          <div>
            <Muted>Availability</Muted>

            <Label>{property.availability}</Label>
          </div>
        </div>

        {/* Action */}
        <div className='space-y-3'>
          <Button size='lg' variant='outline' className='w-full'>
            Request Rental
          </Button>

          <Button size='lg' variant='outline' className='w-full'>
            <Heart className='mr-2 size-4' />
            Save Property
          </Button>
        </div>

        {/* Trust */}
        <div className='flex items-start gap-3 bg-brand/5 p-4 rounded-xl'>
          <ShieldCheck className='mt-0.5 size-5 text-brand' />

          <Muted>
            Your request is secure. The landlord will review and approve your
            rental request.
          </Muted>
        </div>
      </CardContent>
    </Card>
  );
}
