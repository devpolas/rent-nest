"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import type { PropertyManagementResponse } from "@/types/property";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PropertyManagementActions from "./property-management-actions";

type Props = {
  property: PropertyManagementResponse;
  onManageLocation: () => void;
  onBack: () => void;
};

export default function PropertyManagementHeader({
  property,
  onManageLocation,
  onBack,
}: Props) {
  const router = useRouter();

  return (
    <header className='space-y-5'>
      <Button variant='ghost' size='sm' className='-ml-2' onClick={onBack}>
        <ArrowLeft className='mr-2 size-4' />
        Back to Properties
      </Button>

      <div className='flex lg:flex-row flex-col lg:justify-between lg:items-start gap-4'>
        <div className='space-y-2 min-w-0'>
          <div className='flex flex-wrap items-center gap-2'>
            <h1 className='font-semibold text-2xl tracking-tight'>
              {property.title}
            </h1>

            <Badge variant='outline'>{property.status}</Badge>
          </div>

          <p className='text-muted-foreground text-sm'>
            Manage your property information, photos, and location.
          </p>

          <p className='font-mono text-muted-foreground text-xs'>
            ID: {property.id}
          </p>
        </div>

        <PropertyManagementActions
          property={property}
          onManageLocation={onManageLocation}
        />
      </div>
    </header>
  );
}
