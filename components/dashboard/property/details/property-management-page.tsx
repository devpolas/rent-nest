"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import PropertyManagementHeader from "./property-management-header";
import PropertySetupProgress from "./property-setup-progress";
import PropertyOverviewCard from "./property-overview-card";
import PropertyStatusCard from "./property-status-card";
import PropertyImagesCard from "./property-images-card";
import PropertyLocationCard from "./property-location-card";
import { useProperty } from "@/hooks";
import Loading from "@/app/loading";

import type { Location } from "@/types/location";
import { ReusableDialog } from "@/components/dialog/dialog";
import CreateLocation from "@/components/location/create-location";
import UpdateLocation from "@/components/location/update-location";

type Props = {
  propertyId: string;
};

type LocationDialogMode = "create" | "update";

export default function PropertyManagementPage({ propertyId }: Props) {
  const router = useRouter();

  const {
    data: propertyResponse,
    isLoading,
    refetch,
  } = useProperty(propertyId);

  // Location dialog state
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);

  const [locationDialogMode, setLocationDialogMode] =
    useState<LocationDialogMode>("create");

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );

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
          {propertyResponse?.message ?? "Property not found"}
        </p>
      </div>
    );
  }

  const property = propertyResponse.data.property;

  if (!property) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <p className='text-muted-foreground'>Property not found</p>
      </div>
    );
  }

  const location = property.location;

  const refresh = () => {
    refetch();
  };

  // --------------------------------
  // Location handlers
  // --------------------------------

  function handleAddLocation() {
    setSelectedLocation(null);
    setLocationDialogMode("create");
    setLocationDialogOpen(true);
  }

  function handleEditLocation() {
    if (!location) {
      handleAddLocation();
      return;
    }

    setSelectedLocation(location);
    setLocationDialogMode("update");
    setLocationDialogOpen(true);
  }

  function handleLocationDialogChange(open: boolean) {
    setLocationDialogOpen(open);

    if (!open) {
      setSelectedLocation(null);
      setLocationDialogMode("create");
    }
  }

  return (
    <>
      <div className='space-y-6 p-4'>
        <PropertyManagementHeader
          property={property}
          onManageLocation={handleEditLocation}
          onBack={() => router.back()}
        />

        <PropertySetupProgress property={property} />

        <div className='gap-6 grid lg:grid-cols-3'>
          <main className='space-y-6 lg:col-span-2'>
            <PropertyOverviewCard property={property} />

            <PropertyImagesCard property={property} onChanged={refresh} />

            <PropertyLocationCard
              property={property}
              onAddLocation={handleAddLocation}
              onEditLocation={handleEditLocation}
            />
          </main>

          <aside className='space-y-6'>
            <PropertyStatusCard property={property} />
          </aside>
        </div>
      </div>

      {/* Location Dialog */}
      <ReusableDialog
        isOpen={locationDialogOpen}
        onOpenChange={handleLocationDialogChange}
      >
        {locationDialogMode === "create" ? (
          <CreateLocation
            type={"PROPERTY"}
            propertyId={property.id}
            onClose={() => {
              handleLocationDialogChange(false);
            }}
            refresh={refresh}
          />
        ) : selectedLocation ? (
          <UpdateLocation
            location={selectedLocation}
            onClose={() => {
              handleLocationDialogChange(false);
            }}
            refresh={refresh}
          />
        ) : null}
      </ReusableDialog>
    </>
  );
}
