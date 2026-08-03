import Image from "next/image";
import { Badge } from "../ui/badge";
import {
  Bath,
  BedDouble,
  CheckCircle2,
  Home,
  MapPin,
  Ruler,
  ShieldCheck,
  Star,
} from "lucide-react";
import {
  Heading1,
  Heading2,
  Heading3,
  Large,
  Muted,
  Paragraph,
} from "../typography/typography";
import { Card, CardContent } from "../ui/card";
import PropertyDetailItem from "./property-detail-item";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { PropertyResponse } from "@/types/property";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

export default function PropertyDetails({
  property,
}: {
  property: PropertyResponse;
}) {
  return (
    <div className='space-y-10 mx-auto py-10 container'>
      {/* Image Gallery */}
      <section className='gap-4 grid lg:grid-cols-4'>
        <div className='relative lg:col-span-3 rounded-2xl aspect-16/10 overflow-hidden'>
          <Image
            src={property.images[0]?.url}
            alt={property.title}
            fill
            className='object-cover'
          />

          <Badge className='top-5 left-5 absolute bg-brand-success border-0 text-brand-success-foreground'>
            {property.status}
          </Badge>
        </div>

        <div className='gap-4 grid grid-cols-2 lg:grid-cols-1'>
          {property.images.slice(1, 5).map((image) => (
            <div
              key={image.id}
              className='relative rounded-xl aspect-4/3 overflow-hidden'
            >
              <Image
                src={image.url}
                alt={property.title}
                fill
                className='object-cover hover:scale-105 transition'
              />
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className='gap-8 grid lg:grid-cols-3'>
        {/* Left Content */}
        <div className='space-y-8 lg:col-span-2'>
          {/* Header */}
          <div className='space-y-4'>
            <div className='flex flex-wrap items-center gap-3'>
              <Badge variant='secondary' className='bg-brand/10 text-brand'>
                {property.category.name}
              </Badge>

              <div className='flex items-center gap-1 bg-brand/10 px-3 py-1 rounded-full font-medium text-brand text-sm'>
                <Star className='fill-current size-4' />

                {property.averageRating ?? "New"}
              </div>
            </div>

            <Heading1 className='text-3xl md:text-5xl'>
              {property.title}
            </Heading1>

            <div className='flex items-center gap-2 text-brand-muted'>
              <MapPin className='size-5' />

              <Paragraph>
                {property.location.address}, {property.location.city}
              </Paragraph>
            </div>
          </div>

          {/* Price Card */}
          <Card className='bg-brand-surface border-border'>
            <CardContent className='flex flex-wrap justify-between items-center gap-4 p-6'>
              <div>
                <Muted>Daily Rent</Muted>

                <div className='flex items-baseline gap-2'>
                  <Heading3 className='text-brand'>৳{property.rent}</Heading3>

                  <Muted>/month</Muted>
                </div>
              </div>

              <Badge className='bg-brand-success text-brand-success-foreground'>
                Available Now
              </Badge>
            </CardContent>
          </Card>

          {/* Description */}
          <section className='space-y-4'>
            <Heading2>About this property</Heading2>

            <Paragraph>{property.description}</Paragraph>
          </section>

          {/* Property Details */}
          <section className='space-y-4'>
            <Heading2>Property Details</Heading2>

            <div className='gap-4 grid sm:grid-cols-2 md:grid-cols-4'>
              <PropertyDetailItem
                icon={BedDouble}
                label='Bedrooms'
                value={`${property.bedrooms}`}
              />

              <PropertyDetailItem
                icon={Bath}
                label='Bathrooms'
                value={`${property.bathrooms}`}
              />

              <PropertyDetailItem
                icon={Ruler}
                label='Area'
                value={`${property.area} sqft`}
              />

              <PropertyDetailItem
                icon={Home}
                label='Type'
                value={property.category.name}
              />
            </div>
          </section>

          {/* Amenities */}
          <section className='space-y-4'>
            <Heading2>Amenities</Heading2>

            <div className='gap-3 grid sm:grid-cols-2'>
              {property.amenities.map((amenity) => (
                <div
                  key={amenity.id}
                  className='flex items-center gap-3 bg-brand-surface p-4 border border-border rounded-xl'
                >
                  <CheckCircle2 className='size-5 text-brand-success' />

                  <span className='font-medium'>{amenity.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Rules */}
          <section className='space-y-4'>
            <Heading2>House Rules</Heading2>

            <div className='space-y-3'>
              {property.rules.map((rule) => (
                <div
                  key={rule.id}
                  className='flex items-center gap-3 text-muted-foreground'
                >
                  <ShieldCheck className='size-5 text-brand' />

                  {rule.name}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className='space-y-6'>
          {/* Landlord */}
          <Card className='top-24 sticky bg-brand-surface border-border'>
            <CardContent className='space-y-5 p-6'>
              <div className='flex items-center gap-4'>
                <Avatar className='size-14'>
                  <AvatarImage src={property.landlord.profileImage} />

                  <AvatarFallback>LN</AvatarFallback>
                </Avatar>

                <div>
                  <Large>{property.landlord.name}</Large>

                  <Muted>Property Owner</Muted>
                </div>
              </div>

              <Separator />

              <Button
                size='lg'
                className='bg-brand hover:bg-brand/90 w-full text-brand-foreground'
              >
                Request Rental
              </Button>

              <Muted className='text-center'>
                You can contact the landlord after approval.
              </Muted>
            </CardContent>
          </Card>
        </aside>
      </section>

      {/* Reviews */}
      <section className='space-y-5'>
        <Heading2>Reviews</Heading2>

        <div className='gap-5 grid md:grid-cols-2'>
          {property.reviews.map((review) => (
            <Card key={review.id} className='bg-brand-surface'>
              <CardContent className='space-y-3 p-5'>
                <div className='flex items-center gap-3'>
                  <Avatar>
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>

                  <Large>{review.user.name}</Large>
                </div>

                <Paragraph>{review.comment}</Paragraph>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
