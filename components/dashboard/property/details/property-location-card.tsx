"use client";

import { Edit, MapPin, Plus } from "lucide-react";

import type { PropertyManagementResponse } from "@/types/property";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Props = {
  property: PropertyManagementResponse;
  onEditLocation: () => void;
  onAddLocation: () => void;
};

export default function PropertyLocationCard({
  property,
  onEditLocation,
  onAddLocation,
}: Props) {
  const location = property.location;

  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between items-center gap-4'>
          <div>
            <CardTitle>Property location</CardTitle>

            <p className='mt-1 text-muted-foreground text-sm'>
              Where tenants can find this property.
            </p>
          </div>

          {location && (
            <Button
              variant='outline'
              size='sm'
              onClick={() => onEditLocation()}
            >
              <Edit className='mr-2 size-4' />
              Edit
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {location ? (
          <div className='space-y-5'>
            <div className='flex items-start gap-4'>
              <div className='bg-primary/10 p-3 rounded-lg'>
                <MapPin className='size-5 text-primary' />
              </div>

              <div className='min-w-0'>
                <p className='font-medium'>{getLocationTitle(location)}</p>

                <p className='mt-1 text-muted-foreground text-sm'>
                  {getLocationDescription(location)}
                </p>
              </div>
            </div>

            <Separator />

            <div className='gap-4 grid sm:grid-cols-2'>
              <LocationValue label='Country' value={location.country} />
              <LocationValue label='Division' value={location.division} />
              <LocationValue label='District' value={location.district} />
              <LocationValue label='City' value={location.city} />
              <LocationValue label='Village' value={location.village} />
              <LocationValue label='Type' value={location.type} />
            </div>
          </div>
        ) : (
          <div className='flex flex-col justify-center items-center p-8 border border-dashed rounded-xl text-center'>
            <div className='bg-muted mb-4 p-4 rounded-full'>
              <MapPin className='size-7 text-muted-foreground' />
            </div>

            <h3 className='font-medium'>Location hasn&apos;t been added</h3>

            <p className='mt-1 max-w-md text-muted-foreground text-sm'>
              Add the property&apos;s location so tenants can find it.
            </p>

            <Button className='mt-5' onClick={() => onAddLocation()}>
              <Plus className='mr-2 size-4' />
              Add Location
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function LocationValue({ label, value }: { label: string; value: unknown }) {
  return (
    <div>
      <p className='text-muted-foreground text-xs'>{label}</p>

      <p className='mt-1 font-medium text-sm'>{value ? String(value) : "—"}</p>
    </div>
  );
}

function getLocationTitle(
  location: NonNullable<PropertyManagementResponse["location"]>,
) {
  return (
    location.city ||
    location.district ||
    location.division ||
    location.country ||
    "Property location"
  );
}

function getLocationDescription(
  location: NonNullable<PropertyManagementResponse["location"]>,
) {
  return [
    location.village,
    location.city,
    location.district,
    location.division,
    location.country,
  ]
    .filter(Boolean)
    .join(", ");
}
