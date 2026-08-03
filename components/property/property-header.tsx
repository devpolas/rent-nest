"use client";

import { CalendarDays, MapPin, Star } from "lucide-react";
import type { PropertyResponse } from "@/types/property";
import { Badge } from "@/components/ui/badge";
import { Heading1, Muted, Paragraph } from "@/components/typography/typography";

type Props = {
  property: PropertyResponse;
};

export default function PropertyHeader({ property }: Props) {
  const shortLocation = [
    property.location.city,
    property.location.district,
    property.location.country,
  ]
    .filter(Boolean)
    .join(", ");

  const rating =
    property.reviewCount > 0
      ? Number(property.averageRating).toFixed(1)
      : "New";

  return (
    <section className='space-y-6'>
      {/* Badges */}
      <div className='flex flex-wrap items-center gap-3'>
        <Badge variant='secondary'>{property.category.name}</Badge>

        <Badge className='bg-brand-success text-brand-success-foreground'>
          {property.availability}
        </Badge>
      </div>

      {/* Title */}
      <Heading1 className='text-3xl md:text-5xl'>{property.title}</Heading1>

      {/* Meta */}
      <div className='flex flex-wrap items-center gap-x-6 gap-y-3'>
        <div className='flex items-center gap-2'>
          <MapPin className='size-4 text-brand' />

          <Paragraph className='mt-0'>{shortLocation}</Paragraph>
        </div>

        <div className='flex items-center gap-2'>
          <Star className='fill-yellow-400 size-4 text-yellow-400' />

          <Paragraph className='mt-0'>
            {rating}

            {property.reviewCount > 0 && (
              <Muted className='inline'>
                {" "}
                ({property.reviewCount} reviews)
              </Muted>
            )}
          </Paragraph>
        </div>

        <div className='flex items-center gap-2'>
          <CalendarDays className='size-4 text-brand' />
          <Paragraph className='mt-0'>
            Listed {new Date(property.createdAt).toLocaleDateString()}
          </Paragraph>
        </div>
      </div>
    </section>
  );
}
