"use client";

import { ArrowLeft, ImagePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import type { PropertyManagementResponse } from "@/types/property";

type Props = {
  property: PropertyManagementResponse;
  onBack?: () => void;
};

export default function PropertyImagesHeader({ property, onBack }: Props) {
  return (
    <Card>
      <CardContent className='flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 p-6'>
        <div className='flex items-start gap-4'>
          <Button type='button' variant='ghost' size='icon' onClick={onBack}>
            <ArrowLeft className='size-5' />
          </Button>

          <div>
            <div className='flex items-center gap-2'>
              <ImagePlus className='size-5 text-primary' />

              <h1 className='font-semibold text-xl'>Property Photos</h1>
            </div>

            <p className='mt-1 text-muted-foreground text-sm'>
              Add and organize photos for{" "}
              <span className='font-medium text-foreground'>
                {property.title}
              </span>
            </p>
          </div>
        </div>

        <Button type='button' variant='outline' onClick={onBack}>
          Back to Property
        </Button>
      </CardContent>
    </Card>
  );
}
