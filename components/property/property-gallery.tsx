"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { PropertyImage } from "@/types/property-image";

type Props = {
  images: PropertyImage[];
  status: string;
};

export default function PropertyGallery({ images, status }: Props) {
  const thumbnail = images.find((image) => image.isThumbnail) ?? images[0];

  const gallery = images.filter((image) => image.id !== thumbnail?.id);

  if (!thumbnail) {
    return (
      <section className='flex justify-center items-center rounded-2xl aspect-video glass-card'>
        <div className='flex flex-col items-center gap-3 text-muted-foreground'>
          <ImageIcon className='size-12' />
          <p>No image available</p>
        </div>
      </section>
    );
  }

  return (
    <section className='gap-4 grid lg:grid-cols-4'>
      {/* Main Image */}
      <div className='relative lg:col-span-3 rounded-2xl overflow-hidden'>
        <div className='relative aspect-16/10'>
          <Image
            src={thumbnail.url}
            alt='Property Thumbnail'
            fill
            priority
            className='object-cover hover:scale-105 transition duration-500'
          />
        </div>

        <Badge className='top-5 left-5 absolute bg-brand-success text-brand-success-foreground'>
          {status}
        </Badge>

        <div className='right-5 bottom-5 absolute px-3 py-1 rounded-full glass'>
          <span className='font-medium text-sm'>{images.length} Photos</span>
        </div>
      </div>

      {/* Gallery */}
      <div className='gap-4 grid grid-cols-2 lg:grid-cols-1'>
        {gallery.slice(0, 4).map((image, index) => {
          const remaining = gallery.length - 4;
          const isLast = index === 3 && remaining > 0;

          return (
            <div
              key={image.id}
              className='group relative rounded-xl overflow-hidden'
            >
              <div className='relative aspect-4/3'>
                <Image
                  src={image.url}
                  alt={`Property Image ${index + 2}`}
                  fill
                  className='object-cover group-hover:scale-110 transition duration-500'
                />
              </div>

              {isLast && (
                <div className='absolute inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm'>
                  <span className='font-semibold text-white text-lg'>
                    +{remaining}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
