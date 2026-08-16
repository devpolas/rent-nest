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
import Link from "next/link";

type Props = {
  property: PropertyResponse;
};

export default function PropertyCard({ property }: Props) {
  const thumbnail =
    property.images.find((image) => image.isThumbnail) ?? property.images[0];
  return (
    <Card className='group hover:shadow-xl pt-0 overflow-hidden transition-all hover:-translate-y-1 duration-300 glass-card'>
      <div className='relative aspect-4/3 overflow-hidden'>
        {thumbnail && (
          <Image
            src={thumbnail.url}
            alt={property.title}
            fill
            className='object-cover group-hover:scale-110 transition-transform duration-500'
          />
        )}

        <div className='absolute inset-0 opacity-40 brand-gradient' />

        <Badge className='top-4 left-4 absolute bg-brand-success shadow-md border-0 text-brand-success-foreground'>
          {property.availability}
        </Badge>

        <div className='group/favorite top-4 right-4 absolute'>
          <Heart className='fill-transparent group-hover/favorite:fill-red-500 size-5 group-hover/favorite:text-red-500 transition-all duration-200 group-hover/favorite:cursor-pointer' />
          <span className='sr-only'>Save to favorites</span>
        </div>
      </div>

      <CardContent className='space-y-5 p-5'>
        <div className='space-y-2'>
          <Heading5 className='line-clamp-1'>{property.title}</Heading5>

          <div className='flex items-center gap-2'>
            <MapPin className='size-4 text-brand' />

            <Muted className='line-clamp-1'>
              {property.location.city}, {property.location.country}
            </Muted>
          </div>
        </div>

        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-1 bg-brand/10 px-3 py-1 rounded-full font-medium text-brand text-sm'>
            <Star className='fill-current size-4' />
            {Number(property.averageRating).toFixed(1)}
          </div>

          <Muted>{property.reviews} reviews</Muted>
        </div>

        <div className='gap-2 grid grid-cols-3 p-3 rounded-xl glass-card'>
          <Feature icon={BedDouble} value={`${property.bedrooms} Beds`} />
          <Feature icon={Bath} value={`${property.bathrooms} Bath`} />
          <Feature icon={Ruler} value={`${property.area} sqft`} />
        </div>

        <div className='flex justify-between items-end gap-3 pt-2'>
          <div>
            <Muted>Daily Rent</Muted>

            <div className='flex items-baseline gap-1'>
              <Large className='text-brand'>
                ৳{property.rent.toLocaleString()}
              </Large>

              <Caption>/day</Caption>
            </div>
          </div>

          <Button asChild variant='brand'>
            <Link href={`/properties/property/${property.id}`}>
              View Details
            </Link>
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
