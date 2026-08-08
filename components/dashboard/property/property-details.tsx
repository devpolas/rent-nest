"use client";
import Loading from "@/app/loading";
import PropertyDetails from "@/components/property/property-details";
import { useProperty } from "@/hooks";

export default function DashboardPropertiesDetails({ id }: { id: string }) {
  const { data: propertyResponse, isLoading: propertyLoading } =
    useProperty(id);

  if (propertyLoading) {
    return <Loading />;
  }

  if (
    !propertyResponse ||
    !propertyResponse.success ||
    !propertyResponse.data
  ) {
    return (
      <div className='flex justify-center items-center py-20'>
        {propertyResponse?.message ?? "Property not found"}
      </div>
    );
  }

  const property = propertyResponse.data.property;

  console.log(property.amenities);

  return (
    <>
      <PropertyDetails property={property} />;
    </>
  );
}
