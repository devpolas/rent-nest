import { BadgeCheck } from "lucide-react";
import type { PropertyResponse } from "@/types/property";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Large, Muted } from "@/components/typography/typography";

type Props = {
  property: PropertyResponse;
};

export default function PropertyLandlordCard({ property }: Props) {
  const landlord = property.landlord;

  return (
    <Card className='top-24 sticky glass-card'>
      <CardContent className='space-y-6 p-6'>
        <div className='flex items-center gap-4'>
          <Avatar className='size-14'>
            <AvatarImage src={landlord.avatar ?? ""} />

            <AvatarFallback>{landlord.name.slice(0, 2)}</AvatarFallback>
          </Avatar>

          <div>
            <div className='flex items-center gap-2'>
              <Large>{landlord.name}</Large>

              <BadgeCheck className='size-4 text-brand-success' />
            </div>
            <Muted>Property Owner</Muted>
            <Muted className='text-center'>{landlord.email}</Muted>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
