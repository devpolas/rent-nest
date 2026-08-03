import type { ElementType } from "react";
import {
  Bath,
  BedDouble,
  CalendarDays,
  Home,
  Layers3,
  Ruler,
  Shield,
} from "lucide-react";

import type { PropertyResponse } from "@/types/property";
import { Card, CardContent } from "@/components/ui/card";
import { Heading2, Label, Muted } from "@/components/typography/typography";
type Props = {
  property: PropertyResponse;
};

type Specification = {
  label: string;
  value: string;
  icon: ElementType;
};

export default function PropertySpecifications({ property }: Props) {
  const specifications: Specification[] = [
    {
      label: "Bedrooms",
      value: property.bedrooms.toString(),
      icon: BedDouble,
    },
    {
      label: "Bathrooms",
      value: property.bathrooms.toString(),
      icon: Bath,
    },
    {
      label: "Area",
      value: `${property.area} sqft`,
      icon: Ruler,
    },
    {
      label: "Category",
      value: property.category.name,
      icon: Home,
    },
    {
      label: "Status",
      value: property.status,
      icon: Shield,
    },
    {
      label: "Availability",
      value: property.availability,
      icon: Layers3,
    },
    {
      label: "Available From",
      value: new Date(property.availableFrom as string).toLocaleDateString(),
      icon: CalendarDays,
    },
    {
      label: "Security Deposit",
      value: `$${property.securityDeposit.toLocaleString()}`,
      icon: Shield,
    },
  ];

  return (
    <section className='space-y-5'>
      <Heading2>Specifications</Heading2>
      <div className='gap-4 grid sm:grid-cols-2 xl:grid-cols-4'>
        {specifications.map((item) => (
          <SpecificationCard key={item.label} {...item} />
        ))}
      </div>
    </section>
  );
}

type SpecificationCardProps = {
  icon: ElementType;
  label: string;
  value: string;
};

function SpecificationCard({
  icon: Icon,
  label,
  value,
}: SpecificationCardProps) {
  return (
    <Card className='glass-card'>
      <CardContent className='flex items-center gap-4 p-5'>
        <div className='bg-brand/10 p-3 rounded-xl'>
          <Icon className='size-5 text-brand' />
        </div>

        <div className='space-y-1'>
          <Muted>{label}</Muted>

          <Label>{value}</Label>
        </div>
      </CardContent>
    </Card>
  );
}
