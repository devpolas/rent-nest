import { useCreateLocation } from "@/hooks";
import LocationFrom from "./location-from";
import { LocationType } from "@/types/enum";
import { LocationCreateInput } from "@/schemas/location.schema";
import { toast } from "sonner";
import { namePerfect } from "@/utils/helpers";

const DEFAULT_VALUES = {
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

export default function CreateLocation({
  type,
  profileId,
  onClose,
  refresh,
}: {
  type: LocationType;
  profileId?: string;
  onClose?: () => void;
  refresh?: () => void;
}) {
  const { mutateAsync, isPending } = useCreateLocation();
  async function onSubmit(data: LocationCreateInput) {
    try {
      const response = await mutateAsync({ payload: data });
      if (response.success) {
        toast.success(
          response.message ?? `${namePerfect(type)} created successfully`,
        );
        onClose?.();
        refresh?.();
        return;
      }
      toast.error(response.message ?? "Failed to create location");
    } catch (error) {
      toast.error("something went wrong");
    }
  }
  return (
    <LocationFrom
      defaultValues={DEFAULT_VALUES}
      mode='create'
      isPending={isPending}
      onSubmit={onSubmit}
      type={type}
      profileId={profileId}
    />
  );
}
