import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heading2, Lead } from "@/components/typography/typography";

import FeaturedPropertyCard, {
  type FeaturedProperty,
} from "./featured-property-card";

const featuredProperties: FeaturedProperty[] = [
  {
    id: "skyline-apartment",
    title: "Skyline View Apartment",
    image: "/images/properties/skyline-apartment.png",
    city: "Dhaka",
    country: "Bangladesh",
    rent: 45000,
    rating: 4.9,
    reviews: 128,
    bedrooms: 3,
    bathrooms: 2,
    area: 1450,
    availability: "AVAILABLE",
  },
  {
    id: "garden-villa",
    title: "Green Garden Family Villa",
    image: "/images/properties/garden-villa.png",
    city: "Sylhet",
    country: "Bangladesh",
    rent: 68000,
    rating: 4.8,
    reviews: 96,
    bedrooms: 4,
    bathrooms: 3,
    area: 2400,
    availability: "AVAILABLE",
  },
  {
    id: "studio-loft",
    title: "Modern Studio Loft",
    image: "/images/properties/studio-loft.png",
    city: "Chittagong",
    country: "Bangladesh",
    rent: 22000,
    rating: 4.7,
    reviews: 74,
    bedrooms: 1,
    bathrooms: 1,
    area: 620,
    availability: "AVAILABLE",
  },
  {
    id: "penthouse",
    title: "Luxury City Penthouse",
    image: "/images/properties/penthouse.png",
    city: "Dhaka",
    country: "Bangladesh",
    rent: 95000,
    rating: 5.0,
    reviews: 152,
    bedrooms: 4,
    bathrooms: 4,
    area: 3100,
    availability: "RESERVED",
  },
  {
    id: "cozy-flat",
    title: "Cozy Furnished Flat",
    image: "/images/properties/cozy-flat.png",
    city: "Rajshahi",
    country: "Bangladesh",
    rent: 18000,
    rating: 4.6,
    reviews: 61,
    bedrooms: 2,
    bathrooms: 1,
    area: 850,
    availability: "AVAILABLE",
  },
  {
    id: "duplex-home",
    title: "Contemporary Duplex Home",
    image: "/images/properties/duplex-home.png",
    city: "Khulna",
    country: "Bangladesh",
    rent: 52000,
    rating: 4.8,
    reviews: 88,
    bedrooms: 4,
    bathrooms: 3,
    area: 2050,
    availability: "AVAILABLE",
  },
];

export default function FeaturedProperties() {
  return (
    <section className='mx-auto px-4 py-20 container'>
      <div className='flex md:flex-row flex-col md:justify-between md:items-end gap-6 mb-12'>
        <div className='max-w-2xl'>
          <Badge className='bg-brand/10 mb-4 text-brand'>Handpicked</Badge>

          <Heading2 className='border-0'>Featured Properties</Heading2>

          <Lead className='mt-3'>
            Explore our most popular verified rentals, chosen for quality,
            location and value.
          </Lead>
        </div>

        <Button asChild variant='outline' className='rounded-xl'>
          <Link href='/properties'>
            View All Properties
            <ArrowRight className='ml-2 size-4' />
          </Link>
        </Button>
      </div>

      <div className='gap-6 grid md:grid-cols-2 lg:grid-cols-3'>
        {featuredProperties.map((property) => (
          <FeaturedPropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
}
