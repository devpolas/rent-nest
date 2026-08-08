"use client";

import { useState } from "react";
import { MapPin, Plus } from "lucide-react";

import ProfileHero from "./profile-hero";
import ProfileAbout from "./profile-about";
import ProfileInformation from "./profile-information";
import ProfileSidebar from "./profile-sidebar";

import Location from "../location/location";
import CreateLocation from "../location/create-location";
import { ReusableDialog } from "../dialog/dialog";

import { useMe } from "@/hooks";
import Loading from "@/app/loading";

import { Button } from "@/components/ui/button";

type LocationFormType = "HOME" | "CURRENT" | "WORK";

export default function Profile() {
  const [isLocation, setIsLocation] = useState(false);
  const [locationType, setLocationType] = useState<LocationFormType>("HOME");

  const { data, isLoading } = useMe();

  if (isLoading) {
    return <Loading />;
  }

  if (!data || !data.success || !data.data) {
    return (
      <div className='flex justify-center items-center min-h-[300px]'>
        <p className='text-muted-foreground'>
          {data?.message ?? "User not found"}
        </p>
      </div>
    );
  }

  const user = data.data.user;
  console.log(user);
  const locations = user.profile?.location ?? [];

  const homeLocation = locations.find((location) => location.type === "HOME");

  const currentLocation = locations.find(
    (location) => location.type === "CURRENT",
  );

  const workLocation = locations.find((location) => location.type === "WORK");

  function handleOpenLocation(type: LocationFormType) {
    setLocationType(type);
    setIsLocation(true);
  }

  function handleCloseLocation() {
    setIsLocation(false);
  }

  return (
    <>
      <div className='space-y-4 px-4'>
        <ProfileHero user={user} />

        <div className='gap-4 grid lg:grid-cols-3'>
          <main className='space-y-4 lg:col-span-2'>
            <ProfileAbout user={user} />

            <ProfileInformation user={user} />

            {/* Locations */}
            <section className='space-y-4'>
              <div>
                <h2 className='font-semibold text-xl'>Locations</h2>

                <p className='text-muted-foreground text-sm'>
                  Manage your saved locations.
                </p>
              </div>

              <div className='gap-4 grid md:grid-cols-2'>
                {/* Home */}
                {homeLocation ? (
                  <Location location={homeLocation} />
                ) : (
                  <AddLocationCard type='HOME' onAdd={handleOpenLocation} />
                )}

                {/* Current */}
                {currentLocation ? (
                  <Location location={currentLocation} />
                ) : (
                  <AddLocationCard type='CURRENT' onAdd={handleOpenLocation} />
                )}

                {/* Work */}
                {workLocation ? (
                  <Location location={workLocation} />
                ) : (
                  <AddLocationCard type='WORK' onAdd={handleOpenLocation} />
                )}
              </div>
            </section>
          </main>

          <ProfileSidebar user={user} />
        </div>
      </div>

      {/* Create Location Dialog */}
      <ReusableDialog isOpen={isLocation} onOpenChange={handleCloseLocation}>
        <CreateLocation profileId={user.profile.id} type={locationType} />
      </ReusableDialog>
    </>
  );
}

type AddLocationCardProps = {
  type: LocationFormType;
  onAdd: (type: LocationFormType) => void;
};

function AddLocationCard({ type, onAdd }: AddLocationCardProps) {
  const labels = {
    HOME: "Home Location",
    CURRENT: "Current Location",
    WORK: "Work Location",
  };

  return (
    <div className='flex flex-col justify-center items-center p-6 border border-dashed rounded-xl min-h-[180px] text-center'>
      <div className='flex justify-center items-center bg-muted mb-3 rounded-full size-10'>
        <MapPin className='size-5 text-muted-foreground' />
      </div>

      <h3 className='font-medium'>{labels[type]}</h3>

      <p className='mt-1 text-muted-foreground text-sm'>
        No {type.toLowerCase()} location added yet.
      </p>

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
  );
}
