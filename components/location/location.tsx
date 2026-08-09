import type { ElementType } from "react";
import {
  Edit,
  Globe,
  Hash,
  Home,
  Landmark,
  Map,
  MapPin,
  Navigation,
  Route,
} from "lucide-react";

import type { Location } from "@/types/location";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Label, Muted } from "../typography/typography";
import { LocationTypeBadge } from "./location-badge";
import { namePerfect } from "@/utils/helpers";
import { Button } from "../ui/button";

type Props = {
  location: Location;
  onEdit?: (location: Location) => void;
};

type LocationField = {
  label: string;
  value: string;
  icon: ElementType;
};

export default function Location({ location, onEdit }: Props) {
  const locationParts = [
    location.village,
    location.city,
    location.district,
    location.division,
    location.country,
  ].filter((value) => value?.trim());

  const locationText = locationParts.join(", ");

  const addressLine = location.addressLine?.trim()
    ? location.addressLine
    : locationText || "Not provided";

  const fields: LocationField[] = [
    {
      label: "Village",
      value: location.village,
      icon: Route,
    },
    {
      label: "City",
      value: location.city,
      icon: MapPin,
    },
    {
      label: "District",
      value: location.district,
      icon: Landmark,
    },
    {
      label: "Division",
      value: location.division,
      icon: Map,
    },
    {
      label: "Country",
      value: location.country,
      icon: Globe,
    },
    {
      label: "Postal Code",
      value: location.postalCode,
      icon: Hash,
    },
  ];

  const coordinates = [
    {
      label: "Latitude",
      value: location.latitude,
    },
    {
      label: "Longitude",
      value: location.longitude,
    },
  ].filter((item): item is { label: string; value: string } =>
    Boolean(item.value),
  );

  return (
    <Card className='glass-card'>
      <CardHeader>
        <div className='flex justify-between items-center gap-2'>
          <div className='flex items-center gap-2'>
            <CardTitle>
              <LocationTypeBadge type={location.type} />
            </CardTitle>
          </div>

          {onEdit && (
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={() => onEdit?.(location)}
            >
              <Edit className='mr-2 size-4' />
              Edit
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className='space-y-2'>
        <div className='p-2 rounded-xl glass'>
          <Label>{addressLine ?? locationText}</Label>

          <Muted className='mt-2'>Complete Location</Muted>
        </div>

        <Separator />

        <div className='gap-2 grid md:grid-cols-2'>
          {fields.map((field) => (
            <LocationItem
              key={field.label}
              icon={field.icon}
              label={field.label}
              value={field.value}
            />
          ))}
        </div>

        {coordinates.length > 0 && (
          <>
            <Separator />

            <div className='gap-2 grid md:grid-cols-2'>
              {coordinates.map((coordinate) => (
                <LocationItem
                  key={coordinate.label}
                  icon={Navigation}
                  label={coordinate.label}
                  value={coordinate.value}
                />
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

type LocationItemProps = {
  icon: ElementType;
  label: string;
  value: string;
};

function LocationItem({ icon: Icon, label, value }: LocationItemProps) {
  return (
    <div className='flex items-start gap-2 p-2 rounded-xl glass'>
      <div className='bg-brand/10 p-2 rounded-lg'>
        <Icon className='size-4 text-brand' />
      </div>

      <div className='space-y-1'>
        <Muted>{label}</Muted>

        <Label>{value}</Label>
      </div>
    </div>
  );
}
