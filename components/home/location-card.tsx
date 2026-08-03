import { MapPin } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Heading4, Muted } from "../typography/typography";

type LocationCardProps = {
  city: string;
  count: string;
};

export function LocationCard({ city, count }: LocationCardProps) {
  return (
    <Card className='group bg-brand-surface hover:shadow-lg transition hover:-translate-y-1'>
      <CardContent className='space-y-4 p-6'>
        <div className='flex justify-center items-center bg-brand/10 rounded-xl size-12'>
          <MapPin className='size-6 text-brand' />
        </div>

        <div className='space-y-1'>
          <Heading4>{city}</Heading4>
          <Muted>{count}</Muted>
        </div>
      </CardContent>
    </Card>
  );
}
