import { useUpdateLocation } from "@/hooks";
import LocationForm from "./location-from";
import { LocationCreateInput } from "@/schemas/location.schema";
import { toast } from "sonner";
import { namePerfect } from "@/utils/helpers";
import { Location } from "@/types/location";

interface UpdateLocationProps {
  location: Location;
  profileId?: string;
  onClose?: () => void;
  refresh?: () => void;
}

export default function UpdateLocation({
  location,
  profileId,
  onClose,
  refresh,
}: UpdateLocationProps) {
  const { mutateAsync, isPending } = useUpdateLocation();

  async function onSubmit(data: LocationCreateInput) {
    try {
      const response = await mutateAsync({
        id: location.id,
        payload: data,
      });

      if (response.success) {
        toast.success(
          response.message ??
            `${namePerfect(location.type)} updated successfully`,
        );
        onClose?.();
        refresh?.();
        return;
      }

      toast.error(response.message ?? "Failed to update location");
    } catch {
      toast.error("Something went wrong");
    }
  }

  const defaultValues: Partial<LocationCreateInput> = {
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
      profileId={profileId}
      isPending={isPending}
      onSubmit={onSubmit}
    />
  );
}
