"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { PropertyImage } from "@/types/property-image";

type Props = {
  images: PropertyImage[];
  status: string;
};

const MAX_GALLERY_IMAGES = 4;

export default function PropertyGallery({ images, status }: Props) {
  const thumbnail = images.find((image) => image.isThumbnail) ?? images[0];

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

  const galleryImages = images.filter((image) => image.id !== thumbnail.id);

  const visibleImages = galleryImages.slice(0, MAX_GALLERY_IMAGES);
  const remainingCount = galleryImages.length - visibleImages.length;

  return (
    <section className='gap-4 grid lg:grid-cols-4'>
      {/* Main Image */}
      <div className='relative lg:col-span-3 rounded-2xl overflow-hidden'>
        <div className='relative aspect-video'>
          <Image
            src={thumbnail.url}
            alt='Property thumbnail'
            fill
            priority
            sizes='(min-width: 1024px) 75vw, 100vw'
            className='object-cover hover:scale-105 transition-transform duration-500'
          />
        </div>

        <Badge className='top-5 left-5 absolute bg-brand-success text-brand-success-foreground'>
          {status}
        </Badge>

        <div className='right-5 bottom-5 absolute px-3 py-1 rounded-full glass'>
          <span className='font-medium text-sm'>{images.length} Photos</span>
        </div>
      </div>

      {/* Side Gallery */}
      {visibleImages.length > 0 && (
        <div
          className='gap-4 grid min-h-0'
          style={{
            gridTemplateRows: `repeat(${visibleImages.length}, minmax(0, 1fr))`,
          }}
        >
          {visibleImages.map((image, index) => {
            const isLast =
              index === visibleImages.length - 1 && remainingCount > 0;

            return (
              <div
                key={image.id}
                className='group relative rounded-xl min-h-0 overflow-hidden'
              >
                <Image
                  src={image.url}
                  alt={`Property image ${index + 2}`}
                  fill
                  sizes='(min-width: 1024px) 25vw, 50vw'
                  className='object-cover group-hover:scale-110 transition-transform duration-500'
                />

                {isLast && (
                  <div className='absolute inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm'>
                    <span className='font-semibold text-white text-lg'>
                      +{remainingCount}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
