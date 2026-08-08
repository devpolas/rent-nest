"use client";

import { toast } from "sonner";
import PropertyForm from "./property-form";
import { useUpdateProperty } from "@/hooks";
import { PropertyInputType } from "../../../schemas/property.schema";
import { PropertyResponse } from "@/types/property";

export default function UpdateProperty({
  property,
}: {
  property: PropertyResponse;
}) {
  const { mutateAsync: updateProperty, isPending } = useUpdateProperty();
  async function handleUpdate(data: PropertyInputType) {
    try {
      const response = await updateProperty({
        id: property.id,
        payload: data,
      });
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
    } catch {
      toast.error("Something went wrong");
    }
  }

  const defaultValues: Partial<PropertyInputType> = {
    title: property.title,
    description: property.description,
    rent: Number(property.rent),
    securityDeposit: Number(property.securityDeposit),
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    area: Number(property.area),
    availableFrom: new Date(property.availableFrom!),
    availability: property.availability,
    categoryId: property.categoryId,
    amenities: property.amenities.map((amenity) => amenity.id),
    features: property.features.map((feature) => feature.id),
    rules: property.rules.map((rule) => rule.id),
  };

  return (
    <PropertyForm
      mode='update'
      defaultValues={defaultValues}
      isPending={isPending}
      onSubmit={handleUpdate}
    />
  );
}
