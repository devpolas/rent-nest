"use client";

import { useUpdateLocation } from "@/hooks";
import {
  LocationFormValues,
  LocationUpdateInput,
} from "@/schemas/location.schema";
import { toast } from "sonner";
import { namePerfect } from "@/utils/helpers";
import type { Location } from "@/types/location";
import LocationForm from "./location-form";

interface UpdateLocationProps {
  location: Location;
  onClose?: () => void;
  refresh?: () => void;
}

export default function UpdateLocation({
  location,
  onClose,
  refresh,
}: UpdateLocationProps) {
  const { mutateAsync, isPending } = useUpdateLocation();

  async function onSubmit(data: LocationFormValues) {
    try {
      const payload: LocationUpdateInput = {
        latitude: data.latitude,
        longitude: data.longitude,
        country: data.country,
        division: data.division,
        district: data.district,
        city: data.city,
        village: data.village,
        postalCode: data.postalCode,
        addressLine: data.addressLine,
      };

      const response = await mutateAsync({
        id: location.id,
        payload,
      });

      if (!response.success) {
        toast.error(response.message ?? "Failed to update location.");

        return;
      }

      toast.success(
        response.message ??
          `${namePerfect(location.type)} updated successfully`,
      );

      onClose?.();
      refresh?.();
    } catch {
      toast.error("Something went wrong while updating location.");
    }
  }

  const defaultValues: Partial<LocationFormValues> = {
    type: location.type,
    country: location.country,
    division: location.division,
    district: location.district,
    city: location.city,
    village: location.village,
    postalCode: location.postalCode,
    latitude: location.latitude ?? "",
    longitude: location.longitude ?? "",
    addressLine: location.addressLine ?? "",
  };

  return (
    <LocationForm
      type={location.type}
      mode='update'
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      isPending={isPending}
    />
  );
}
