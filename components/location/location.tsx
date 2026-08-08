import type { ElementType } from "react";
import {
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

type Props = {
  location: Location;
};

type LocationField = {
  label: string;
  value: string;
  icon: ElementType;
};

export default function Location({ location }: Props) {
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
      <CardHeader className='flex flex-row justify-between items-center'>
        <CardTitle className='flex items-center gap-2'>
          <MapPin className='size-5 text-brand' />
          {namePerfect(location.type)} Location
        </CardTitle>

        <LocationTypeBadge type={location.type} />
      </CardHeader>

      <CardContent className='space-y-6'>
        <div className='p-4 rounded-xl glass'>
          <Label>{addressLine ?? locationText}</Label>

          <Muted className='mt-2'>Complete Location</Muted>
        </div>

        <Separator />

        <div className='gap-4 grid md:grid-cols-2'>
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

            <div className='gap-4 grid md:grid-cols-2'>
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
    <div className='flex items-start gap-3 p-4 rounded-xl glass'>
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
