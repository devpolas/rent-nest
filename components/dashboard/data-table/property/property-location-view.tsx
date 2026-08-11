"use client";
import * as React from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReusableDialog } from "@/components/dialog/dialog";
import { type Location as LocationType } from "@/types/location";
import Location from "@/components/location/location";

export function PropertyLocationView({ location }: { location: LocationType }) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <Button
        type='button'
        variant='ghost'
        size='sm'
        onClick={() => setIsOpen(true)}
      >
        <Eye className='size-4' /> Location
      </Button>
      <ReusableDialog isOpen={isOpen} onOpenChange={setIsOpen}>
        <div className='space-y-4'>
          <h3 className='font-semibold text-lg'> Property Location </h3>
          {location ? (
            <div className='flex flex-wrap gap-2'>
              <Location location={location} />
            </div>
          ) : (
            <p className='text-muted-foreground text-sm'>No location found.</p>
          )}
        </div>
      </ReusableDialog>
    </>
  );
}
