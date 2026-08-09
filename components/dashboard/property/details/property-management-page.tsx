"use client";

import { useRouter } from "next/navigation";

import PropertyManagementHeader from "./property-management-header";
import PropertySetupProgress from "./property-setup-progress";
import PropertyOverviewCard from "./property-overview-card";
import PropertyStatusCard from "./property-status-card";
import PropertyImagesCard from "./property-images-card";
import PropertyLocationCard from "./property-location-card";
import { useProperty } from "@/hooks";
import Loading from "@/app/loading";

type Props = {
  propertyId: string;
};

export default function PropertyManagementPage({ propertyId }: Props) {
  const router = useRouter();
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

  const refresh = () => {
    router.refresh();
  };

  return (
    <div className='space-y-8'>
      <PropertyManagementHeader
        property={property}
        onBack={() => router.back()}
      />

      <PropertySetupProgress property={property} />

      <div className='gap-6 grid lg:grid-cols-3'>
        <main className='space-y-6 lg:col-span-2'>
          <PropertyOverviewCard property={property} />
          <PropertyImagesCard property={property} onChanged={refresh} />
          <PropertyLocationCard property={property} onChanged={refresh} />
        </main>
        <aside className='space-y-6'>
          <PropertyStatusCard property={property} />
        </aside>
      </div>
    </div>
  );
}
