"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import ProfileHero from "./profile-hero";
import ProfileAbout from "./profile-about";
import ProfileInformation from "./profile-information";
import ProfileSidebar from "./profile-sidebar";
import { useMe } from "@/hooks";
import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import type { Location as LocationType } from "@/types/location";
import { ReusableDialog } from "@/components/dialog/dialog";
import Location from "@/components/location/location";
import CreateLocation from "@/components/location/create-location";
import UpdateLocation from "@/components/location/update-location";

type LocationFormType = "HOME" | "CURRENT" | "WORK";

type LocationDialogMode = "create" | "update";

type LocationItem = {
  type: LocationFormType;
  location: LocationType | undefined;
};

export default function Profile() {
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);

  const [locationDialogMode, setLocationDialogMode] =
    useState<LocationDialogMode>("create");

  const [locationType, setLocationType] = useState<LocationFormType>("HOME");

  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(
    null,
  );

  const { data, isLoading, refetch } = useMe();

  if (isLoading) {
    return <Loading />;
  }

  if (!data || !data.success || !data.data) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <p className='text-muted-foreground'>
          {data?.message ?? "User not found"}
        </p>
      </div>
    );
  }

  const user = data.data.user;
  const profile = user.profile;

  if (!profile) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <p className='text-muted-foreground'>Profile not found</p>
      </div>
    );
  }

  const locations = profile.location ?? [];

  const homeLocation = locations.find((location) => location.type === "HOME");

  const currentLocation = locations.find(
    (location) => location.type === "CURRENT",
  );

  const workLocation = locations.find((location) => location.type === "WORK");

  const locationItems: LocationItem[] = [
    {
      type: "HOME",
      location: homeLocation,
    },
    {
      type: "CURRENT",
      location: currentLocation,
    },
    {
      type: "WORK",
      location: workLocation,
    },
  ];

  function handleAddLocation(type: LocationFormType) {
    setLocationType(type);
    setSelectedLocation(null);
    setLocationDialogMode("create");
    setLocationDialogOpen(true);
  }

  function handleEditLocation(location: LocationType) {
    setSelectedLocation(location);
    setLocationType(location.type as LocationFormType);
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
      <div className='space-y-6 mx-auto px-4 py-6 container'>
        <ProfileHero user={user} />
        <div className='gap-6 grid lg:grid-cols-3'>
          <main className='space-y-6 lg:col-span-2 min-w-0'>
            <ProfileAbout user={user} />
            <ProfileInformation user={user} />

            {/* Locations */}
            <section className='space-y-4 min-w-0'>
              <div>
                <h2 className='font-semibold text-xl'>Locations</h2>
                <p className='text-muted-foreground text-sm'>
                  Manage your saved locations.
                </p>
              </div>
              <div className='space-y-4'>
                {locationItems.map(({ type, location }) => (
                  <div key={type} className='min-w-0'>
                    {location ? (
                      <Location
                        location={location}
                        onEdit={handleEditLocation}
                      />
                    ) : (
                      <AddLocationCard type={type} onAdd={handleAddLocation} />
                    )}
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Sidebar */}
          <aside className='lg:col-span-1 min-w-0'>
            <div className='lg:top-6 lg:sticky'>
              <ProfileSidebar user={user} />
            </div>
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
            profileId={profile.id}
            type={locationType}
            onClose={() => {
              handleLocationDialogChange(false);
            }}
            refresh={refetch}
          />
        ) : selectedLocation ? (
          <UpdateLocation
            location={selectedLocation}
            onClose={() => {
              handleLocationDialogChange(false);
            }}
            refresh={refetch}
          />
        ) : null}
      </ReusableDialog>
    </>
  );
}

type AddLocationCardProps = {
  type: LocationFormType;
  onAdd: (type: LocationFormType) => void;
};

function AddLocationCard({ type, onAdd }: AddLocationCardProps) {
  const labels: Record<LocationFormType, string> = {
    HOME: "Home Location",
    CURRENT: "Current Location",
    WORK: "Work Location",
  };

  return (
    <div className='flex flex-col justify-center items-center p-6 border border-dashed rounded-xl min-h-[220px]'>
      <h3 className='font-medium'>{labels[type]}</h3>

      <p className='mt-1 text-muted-foreground text-sm'>
        No {type.toLowerCase()} location added yet.
      </p>

      <div>
        <Button
          type='button'
          variant='outline'
          size='sm'
          className='mt-4'
          onClick={() => onAdd(type)}
        >
          <Plus className='mr-2 size-4' />
          Add Location
        </Button>
      </div>
    </div>
  );
}
