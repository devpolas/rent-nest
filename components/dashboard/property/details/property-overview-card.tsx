import {
  Bath,
  BedDouble,
  Building2,
  CalendarDays,
  Home,
  Ruler,
  ShieldCheck,
  Wallet,
} from "lucide-react";

import type { PropertyManagementResponse } from "@/types/property";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  property: PropertyManagementResponse;
};

type InformationItemProps = {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
};

function InformationItem({ icon, label, value }: InformationItemProps) {
  return (
    <div className='flex items-start gap-3'>
      <div className='bg-muted p-2 rounded-md'>{icon}</div>

      <div className='min-w-0'>
        <p className='text-muted-foreground text-xs'>{label}</p>

        <p className='mt-1 font-medium text-sm'>{value}</p>
      </div>
    </div>
  );
}

export default function PropertyOverviewCard({ property }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Property overview</CardTitle>
      </CardHeader>

      <CardContent className='space-y-6'>
        <div>
          <p className='text-muted-foreground text-sm leading-7 whitespace-pre-line'>
            {property.description || (
              <span className='italic'>No description has been added.</span>
            )}
          </p>
        </div>

        <div className='gap-5 grid sm:grid-cols-2 pt-6 border-t'>
          <InformationItem
            icon={<Building2 className='size-4 text-muted-foreground' />}
            label='Category'
            value={property.category?.name ?? "—"}
          />

          <InformationItem
            icon={<Home className='size-4 text-muted-foreground' />}
            label='Property type'
            value={property.category?.name ?? "—"}
          />

          <InformationItem
            icon={<Wallet className='size-4 text-muted-foreground' />}
            label='Daily rent'
            value={`৳${Number(property.rent).toLocaleString()}`}
          />

          <InformationItem
            icon={<ShieldCheck className='size-4 text-muted-foreground' />}
            label='Security deposit'
            value={`৳${Number(property.securityDeposit).toLocaleString()}`}
          />

          <InformationItem
            icon={<BedDouble className='size-4 text-muted-foreground' />}
            label='Bedrooms'
            value={property.bedrooms}
          />

          <InformationItem
            icon={<Bath className='size-4 text-muted-foreground' />}
            label='Bathrooms'
            value={property.bathrooms}
          />

          <InformationItem
            icon={<Ruler className='size-4 text-muted-foreground' />}
            label='Area'
            value={`${property.area} sqft`}
          />

          <InformationItem
            icon={<CalendarDays className='size-4 text-muted-foreground' />}
            label='Available from'
            value={
              property.availableFrom
                ? new Date(property.availableFrom).toLocaleDateString()
                : "Immediately"
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
