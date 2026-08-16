import { CalendarDays, CircleDot, Clock3, Eye, Star } from "lucide-react";

import type { PropertyManagementResponse } from "@/types/property";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type Props = {
  property: PropertyManagementResponse;
};

export default function PropertyStatusCard({ property }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Property status</CardTitle>
      </CardHeader>

      <CardContent className='space-y-5'>
        <div>
          <p className='mb-2 text-muted-foreground text-xs'>Status</p>

          <Badge variant='outline'>{property.status}</Badge>
        </div>

        <div>
          <p className='mb-2 text-muted-foreground text-xs'>Availability</p>

          <div className='flex items-center gap-2'>
            <CircleDot className='size-4 text-primary' />

            <span className='font-medium text-sm'>{property.availability}</span>
          </div>
        </div>

        <Separator />

        <div className='space-y-4'>
          <StatusRow
            icon={<Star className='size-4' />}
            label='Rating'
            value={
              property.reviewCount > 0
                ? `${property.averageRating.toFixed(1)}`
                : "No reviews"
            }
          />

          <StatusRow
            icon={<Eye className='size-4' />}
            label='Reviews'
            value={property.reviewCount}
          />

          <StatusRow
            icon={<CalendarDays className='size-4' />}
            label='Created'
            value={new Date(property.createdAt).toLocaleDateString()}
          />

          <StatusRow
            icon={<Clock3 className='size-4' />}
            label='Updated'
            value={new Date(property.updatedAt).toLocaleDateString()}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function StatusRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className='flex justify-between items-center gap-4'>
      <div className='flex items-center gap-2 text-muted-foreground'>
        {icon}

        <span className='text-sm'>{label}</span>
      </div>

      <span className='font-medium text-sm'>{value}</span>
    </div>
  );
}
