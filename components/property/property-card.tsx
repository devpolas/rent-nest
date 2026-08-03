import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Bath, BedDouble, Heart, MapPin, Ruler, Star } from "lucide-react";
import { Caption, Heading5, Large, Muted } from "../typography/typography";
import { PropertyResponse } from "@/types/property";

export default function PropertyCard({
  property,
}: {
  property: PropertyResponse;
}) {
  return (
    <Card className='group bg-brand-surface hover:shadow-xl border-border overflow-hidden transition-all hover:-translate-y-1 duration-300'>
      {/* Image Section */}
      <div className='relative aspect-4/3 overflow-hidden'>
        <Image
          src={property.images?.[0]?.url}
          alt={property.title}
          fill
          className='object-cover group-hover:scale-105 transition-transform duration-500'
        />

        {/* Availability */}
        <Badge className='top-4 left-4 absolute bg-brand-success shadow-sm border-0 text-brand-success-foreground'>
          Available
        </Badge>

        {/* Favorite */}
        <Button
          size='icon'
          variant='secondary'
          className='top-4 right-4 absolute bg-background/80 hover:bg-background backdrop-blur rounded-full transition'
        >
          <Heart className='size-5' />
        </Button>
      </div>

      {/* Content */}
      <CardContent className='space-y-4 p-5'>
        {/* Title */}
        <div className='space-y-1'>
          <Heading5 className='line-clamp-1'>{property.title}</Heading5>

          <div className='flex items-center gap-1 text-brand-muted'>
            <MapPin className='size-4' />

            <Muted className='line-clamp-1'>
              {property.location.city}, {property.location.country}
            </Muted>
          </div>
        </div>

        {/* Rating */}
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-1 bg-brand/10 px-2.5 py-1 rounded-full font-medium text-brand text-sm'>
            <Star className='fill-current size-4' />

            {property.averageRating ?? "New"}
          </div>

          <span className='text-brand-muted text-sm'>
            • {property.reviewCount ?? 0} reviews
          </span>
        </div>

        {/* Features */}
        <div className='gap-2 grid grid-cols-3 bg-background/50 p-3 border border-border rounded-lg'>
          <div className='flex flex-col items-center'>
            <BedDouble className='size-5 text-brand' />
            <Caption>{property.bedrooms} Beds</Caption>
          </div>

          <div className='flex flex-col items-center'>
            <Bath className='size-5 text-brand' />
            <Caption>{property.bathrooms} Bath</Caption>
          </div>

          <div className='flex flex-col items-center'>
            <Ruler className='size-5 text-brand' />
            <Caption>{property.area} sqft</Caption>
          </div>
        </div>

        {/* Footer */}
        <div className='flex justify-between items-end pt-2'>
          <div>
            <Muted>Rent</Muted>

            <div className='flex items-baseline gap-1'>
              <Large className='text-brand'>৳{property.rent}</Large>

              <span className='text-brand-muted text-sm'>/month</span>
            </div>
          </div>

          <Button className='bg-brand hover:bg-brand/90 text-brand-foreground'>
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
