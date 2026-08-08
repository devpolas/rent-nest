import { CheckCircle2 } from "lucide-react";
import type { PropertyResponse } from "@/types/property";
import { Card, CardContent } from "@/components/ui/card";
import { Heading2, Label, Muted } from "@/components/typography/typography";

type Props = {
  property: PropertyResponse;
};

export default function PropertyAmenities({ property }: Props) {
  return (
    <section className='space-y-5'>
      <div className='flex justify-between items-center'>
        <Heading2 className='pb-0 border-none'>Amenities</Heading2>

        <Muted>{property.amenities.length} Amenities</Muted>
      </div>

      {property.amenities.length === 0 ? (
        <Card className='glass-card'>
          <CardContent className='py-10 text-center'>
            <Muted>No amenities have been added for this property.</Muted>
          </CardContent>
        </Card>
      ) : (
        <div className='gap-4 grid sm:grid-cols-2 xl:grid-cols-3'>
          {property.amenities.map((amenity) => (
            <AmenityCard key={amenity.id} name={amenity.amenity.name} />
          ))}
        </div>
      )}
    </section>
  );
}

type AmenityCardProps = {
  name: string;
};

function AmenityCard({ name }: AmenityCardProps) {
  return (
    <Card className='hover:border-brand/20 transition-all hover:-translate-y-1 duration-300 glass-card'>
      <CardContent className='flex items-center gap-4 p-5'>
        <div className='bg-brand-success/10 p-3 rounded-xl'>
          <CheckCircle2 className='size-5 text-brand-success' />
        </div>

        <Label>{name}</Label>
      </CardContent>
    </Card>
  );
}
