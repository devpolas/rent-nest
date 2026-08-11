"use client";
import { useProperties } from "@/hooks";
import Loading from "@/app/loading";
import propertyColumns from "./property-columns";
import PropertyTable from "./property-table";

export default function DashboardPropertyTable() {
  const { data: propertyResponse, isLoading } = useProperties();

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
          {propertyResponse?.message ?? "Properties not found"}
        </p>
      </div>
    );
  }
  const properties = propertyResponse?.data?.properties ?? [];

  return (
    <div className='p-4'>
      <PropertyTable data={properties} columns={propertyColumns} />;
    </div>
  );
}
