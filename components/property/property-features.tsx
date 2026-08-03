import { Sparkles } from "lucide-react";
import type { PropertyResponse } from "@/types/property";
import { Card, CardContent } from "@/components/ui/card";
import { Heading2, Label, Muted } from "@/components/typography/typography";
type Props = {
  property: PropertyResponse;
};

export default function PropertyFeatures({ property }: Props) {
  return (
    <section className='space-y-5'>
      <div className='flex justify-between items-center'>
        <Heading2 className='pb-0 border-none'>Features</Heading2>

        <Muted>{property.features.length} Features</Muted>
      </div>

      {property.features.length === 0 ? (
        <Card className='glass-card'>
          <CardContent className='py-10 text-center'>
            <Muted>No features have been added for this property.</Muted>
          </CardContent>
        </Card>
      ) : (
        <div className='gap-4 grid sm:grid-cols-2 xl:grid-cols-3'>
          {property.features.map((feature) => (
            <FeatureCard key={feature.id} name={feature.name} />
          ))}
        </div>
      )}
    </section>
  );
}

type FeatureCardProps = {
  name: string;
};

function FeatureCard({ name }: FeatureCardProps) {
  return (
    <Card className='hover:border-brand/20 transition-all hover:-translate-y-1 duration-300 glass-card'>
      <CardContent className='flex items-center gap-4 p-5'>
        <div className='bg-brand/10 p-3 rounded-xl'>
          <Sparkles className='size-5 text-brand' />
        </div>

        <Label>{name}</Label>
      </CardContent>
    </Card>
  );
}
