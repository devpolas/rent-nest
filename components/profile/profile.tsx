"use client";

import ProfileHero from "./profile-hero";
import ProfileAbout from "./profile-about";
import ProfileInformation from "./profile-information";
import ProfileSocial from "./profile-social";
import ProfileSidebar from "./profile-sidebar";

import Location from "../location/location";
import { useMe } from "@/hooks";
import Loading from "@/app/loading";

export default function Profile() {
  const { data, isLoading } = useMe();

  if (isLoading) {
    return <Loading />;
  }

  if (!data || !data.success || !data.data) {
    return (
      <div className='flex justify-center items-center py-20'>
        {data?.message ?? "User not found"}
      </div>
    );
  }

  const user = data.data.user ?? {};

  const locations = user.profile?.locations ?? [];

  return (
    <div className='space-y-8 mx-auto py-10 container'>
      <ProfileHero user={user} />

      <div className='gap-8 grid lg:grid-cols-3'>
        <main className='space-y-8 lg:col-span-2'>
          <ProfileAbout user={user} />

          <ProfileInformation user={user} />

          {locations.length > 0 && (
            <section className='space-y-6'>
              {locations.map((location) => (
                <Location key={location.id} location={location} />
              ))}
            </section>
          )}

          <ProfileSocial user={user} />
        </main>

        <ProfileSidebar user={user} />
      </div>
    </div>
  );
}
