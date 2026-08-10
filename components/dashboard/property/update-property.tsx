"use client";

import { toast } from "sonner";
import PropertyForm from "./property-form";
import { useProperty, useUpdateProperty } from "@/hooks";
import { PropertyInputType } from "../../../schemas/property.schema";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function UpdateProperty({ propertyId }: { propertyId: string }) {
  const router = useRouter();
  const { mutateAsync: updateProperty, isPending } = useUpdateProperty();
  const { data: propertyResponse, isLoading } = useProperty(propertyId);

  if (isLoading) {
    return <Loading />;
  }

  if (
    !propertyResponse ||
    !propertyResponse.success ||
    !propertyResponse.data
  ) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <p className='text-muted-foreground'>
          {propertyResponse?.message ?? "User not found"}
        </p>
      </div>
    );
  }

  const property = propertyResponse.data.property;

  if (!property) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <p className='text-muted-foreground'>Profile not found</p>
      </div>
    );
  }

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
      router.push(`/dashboard/properties/${propertyId}`);
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
    availableFrom: property.availableFrom
      ? new Date(property.availableFrom)
      : new Date(),
    availability: property.availability,
    categoryId: property.categoryId,
    amenities: property.amenities.map((amenity) => amenity.amenity.id),
    features: property.features.map((feature) => feature.feature.id),
    rules: property.rules.map((rule) => rule.rule.id),
  };

  return (
    <>
      <div className='p-4'>
        <Button
          variant='ghost'
          size='sm'
          className='-ml-2'
          onClick={() => router.back()}
        >
          <ArrowLeft className='mr-2 size-4' />
          Back to Property
        </Button>
      </div>
      <PropertyForm
        mode='update'
        defaultValues={defaultValues}
        isPending={isPending}
        onSubmit={handleUpdate}
      />
    </>
  );
}
