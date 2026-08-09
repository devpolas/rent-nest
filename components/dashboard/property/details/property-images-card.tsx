"use client";

import { ImagePlus, Images } from "lucide-react";
import { useRouter } from "next/navigation";

import type { PropertyManagementResponse } from "@/types/property";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Props = {
  property: PropertyManagementResponse;
  onChanged?: () => void;
};

export default function PropertyImagesCard({ property }: Props) {
  const router = useRouter();

  const imageCount = property.images.length;
  const thumbnail = property.images.find((image) => image.isThumbnail);

  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between items-center gap-4'>
          <div>
            <CardTitle>Photos</CardTitle>

            <p className='mt-1 text-muted-foreground text-sm'>
              Manage your property photos and cover image.
            </p>
          </div>

          <Badge variant='secondary'>{imageCount} / 10</Badge>
        </div>
      </CardHeader>

      <CardContent>
        {imageCount > 0 ? (
          <div className='space-y-4'>
            <div className='gap-3 grid grid-cols-2 sm:grid-cols-4'>
              {property.images.slice(0, 4).map((image) => (
                <div
                  key={image.id}
                  className='group relative bg-muted border rounded-lg aspect-video overflow-hidden'
                >
                  <img
                    src={image.url}
                    alt={property.title}
                    className='size-full object-cover group-hover:scale-105 transition-transform'
                  />

                  {image.isThumbnail && (
                    <Badge className='top-2 left-2 absolute'>Cover</Badge>
                  )}
                </div>
              ))}
            </div>

            <div className='flex justify-between items-center gap-4'>
              <p className='text-muted-foreground text-xs'>
                {thumbnail
                  ? "Your cover image is selected."
                  : "No cover image selected."}
              </p>

              <Button
                variant='outline'
                onClick={() =>
                  router.push(`/dashboard/properties/${property.id}/images`)
                }
              >
                <Images className='mr-2 size-4' />
                Manage Photos
              </Button>
            </div>
          </div>
        ) : (
          <div className='flex flex-col justify-center items-center p-8 border border-dashed rounded-xl text-center'>
            <div className='bg-muted mb-4 p-4 rounded-full'>
              <ImagePlus className='size-7 text-muted-foreground' />
            </div>

            <h3 className='font-medium'>No photos added</h3>

            <p className='mt-1 max-w-md text-muted-foreground text-sm'>
              Add photos to showcase your property. Your first photo can be used
              as the cover.
            </p>

            <Button
              className='mt-5'
              onClick={() =>
                router.push(`/dashboard/properties/${property.id}/images`)
              }
            >
              <ImagePlus className='mr-2 size-4' />
              Add Photos
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
