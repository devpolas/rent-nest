"use client";

import { useCreateLocation } from "@/hooks";
import {
  LocationCreateInput,
  LocationFormValues,
} from "@/schemas/location.schema";
import { LocationType } from "@/types/enum";
import { toast } from "sonner";
import { namePerfect } from "@/utils/helpers";
import LocationForm from "./location-form";

const DEFAULT_VALUES: Partial<LocationFormValues> = {
  latitude: "",
  longitude: "",
  country: "",
  division: "",
  district: "",
  city: "",
  village: "",
  postalCode: "",
  addressLine: "",
};

interface CreateLocationProps {
  type: LocationType;
  profileId?: string;
  propertyId?: string;
  onClose?: () => void;
  refresh?: () => void;
}

export default function CreateLocation({
  type,
  profileId,
  propertyId,
  onClose,
  refresh,
}: CreateLocationProps) {
  const { mutateAsync, isPending } = useCreateLocation();

  async function onSubmit(data: LocationFormValues) {
    try {
      if (type !== LocationType.PROPERTY) {
        if (!profileId) {
          toast.error("Profile ID is required for this location.");
          return;
        }
      }

      if (type === LocationType.PROPERTY) {
        if (!propertyId) {
          toast.error("Property ID is required for property location.");
          return;
        }
      }

      const payload: LocationCreateInput = {
        ...data,
        type,
        ...(type === LocationType.PROPERTY
          ? {
              propertyId,
            }
          : {
              profileId,
            }),
      };

      const response = await mutateAsync({
        payload,
      });

      if (!response.success) {
        toast.error(response.message ?? "Failed to create location.");
        return;
      }

      toast.success(
        response.message ?? `${namePerfect(type)} created successfully`,
      );

      onClose?.();
      refresh?.();
    } catch {
      toast.error("Something went wrong while creating location.");
    }
  }

  return (
    <LocationForm
      type={type}
      mode='create'
      defaultValues={DEFAULT_VALUES}
      onSubmit={onSubmit}
      isPending={isPending}
    />
  );
}
