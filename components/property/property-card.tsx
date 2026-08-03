import Image from "next/image";
import { Bath, BedDouble, Heart, MapPin, Ruler, Star } from "lucide-react";
import type { PropertyResponse } from "@/types/property";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Caption,
  Heading5,
  Large,
  Muted,
} from "@/components/typography/typography";

type Props = {
  property: PropertyResponse;
};

export default function PropertyCard({ property }: Props) {
  const thumbnail =
    property.images.find((image) => image.isThumbnail) ?? property.images[0];

  return (
    <Card className='group hover:shadow-xl overflow-hidden transition-all hover:-translate-y-1 duration-300 glass-card'>
      {/* Image */}
      <div className='relative aspect-4/3 overflow-hidden'>
        {thumbnail && (
          <Image
            src={thumbnail.url}
            alt={property.title}
            fill
            className='object-cover group-hover:scale-110 transition-transform duration-500'
          />
        )}

        {/* Gradient Overlay */}
        <div className='absolute inset-0 opacity-40 brand-gradient' />

        {/* Status */}
        <Badge className='top-4 left-4 absolute bg-brand-success shadow-md border-0 text-brand-success-foreground'>
          {property.availability}
        </Badge>

        {/* Favorite */}
        <Button
          size='icon'
          variant='secondary'
          className='top-4 right-4 absolute bg-background/70 hover:bg-background backdrop-blur-xl border border-border/50 rounded-full'
        >
          <Heart className='size-5' />
        </Button>
      </div>

      <CardContent className='space-y-5 p-5'>
        {/* Title + Location */}
        <div className='space-y-2'>
          <Heading5 className='line-clamp-1'>{property.title}</Heading5>

          <div className='flex items-center gap-2'>
            <MapPin className='size-4 text-brand' />

            <Muted className='line-clamp-1'>
              {property.location.city}, {property.location.country}
            </Muted>
          </div>
        </div>

        {/* Rating */}
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-1 bg-brand/10 px-3 py-1 rounded-full font-medium text-brand text-sm'>
            <Star className='fill-current size-4' />

            {property.averageRating
              ? Number(property.averageRating).toFixed(1)
              : "New"}
          </div>

          <Muted>{property.reviewCount ?? 0} reviews</Muted>
        </div>

        {/* Specifications */}
        <div className='gap-2 grid grid-cols-3 p-3 rounded-xl glass'>
          <Feature icon={BedDouble} value={`${property.bedrooms} Beds`} />
          <Feature icon={Bath} value={`${property.bathrooms} Bath`} />
          <Feature icon={Ruler} value={`${property.area} sqft`} />
        </div>

        {/* Footer */}
        <div className='flex justify-between items-end gap-3 pt-2'>
          <div>
            <Muted>Daily Rent</Muted>

            <div className='flex items-baseline gap-1'>
              <Large className='text-brand'>
                ৳{Number(property.rent).toLocaleString()}
              </Large>

              <Caption>/month</Caption>
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

type FeatureProps = {
  icon: React.ElementType;
  value: string;
};

function Feature({ icon: Icon, value }: FeatureProps) {
  return (
    <div className='flex flex-col items-center gap-1'>
      <Icon className='size-5 text-brand' />
      <Caption>{value}</Caption>
    </div>
  );
}
