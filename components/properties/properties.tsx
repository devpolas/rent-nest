"use client";

import Loading from "@/app/loading";
import { useProperties } from "@/hooks";
import PropertyCard from "../property/property-card";

export default function Properties() {
  const { data, isLoading } = useProperties({
    status: "APPROVED",
    availability: "AVAILABLE",
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!data || !data.success || !data.data) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <p className='text-muted-foreground'>
          {data?.message ?? "Properties not found"}
        </p>
      </div>
    );
  }

  const properties = data?.data?.properties ?? [];
  console.log(properties);

  return (
    <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto p-4 container'>
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </section>
  );
}
