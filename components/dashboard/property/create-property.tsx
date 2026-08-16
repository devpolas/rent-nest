"use client";

import { toast } from "sonner";
import PropertyForm from "./property-form";
import { useCreateProperty } from "@/hooks";
import { PropertyInputType } from "../../../schemas/property.schema";
import { useRouter } from "next/navigation";

const DEFAULT_VALUES: Partial<PropertyInputType> = {
  title: "",
  description: "",
  rent: undefined,
  securityDeposit: undefined,
  bedrooms: undefined,
  bathrooms: undefined,
  area: undefined,
  availableFrom: undefined,
  availability: undefined,
  categoryId: undefined,
  amenities: [],
  features: [],
  rules: [],
};

export default function CreateProperty() {
  const router = useRouter();
  const { mutateAsync: createProperty, isPending } = useCreateProperty();
  async function handleCreate(data: PropertyInputType) {
    try {
      const response = await createProperty({
        payload: data,
      });
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
      router.push(
        `/dashboard/landlord/properties/${response.data?.property.id}/edit`,
      );
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <PropertyForm
      mode='create'
      defaultValues={DEFAULT_VALUES}
      isPending={isPending}
      onSubmit={handleCreate}
    />
  );
}
