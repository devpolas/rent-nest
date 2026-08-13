"use client";
import Loading from "@/app/loading";
import { useAllPropertyDetails } from "@/hooks";
import { AllPropertyDetailsMap } from "@/types/property";
import PropertyDetailsTable from "./property-details-table";
import { propertyDetailsColumns } from "./property-details-columns";

export default function DashboardPropertyDetailsTable<
  T extends keyof AllPropertyDetailsMap,
>({ detailsAction }: { detailsAction: T }) {
  const { data: propertyDetailsResponse, isLoading } =
    useAllPropertyDetails(detailsAction);

  if (isLoading) {
    return <Loading />;
  }

  if (
    !propertyDetailsResponse ||
    !propertyDetailsResponse.success ||
    !propertyDetailsResponse.data
  ) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <p className='text-muted-foreground'>
          {propertyDetailsResponse?.message ?? "Properties not found"}
        </p>
      </div>
    );
  }

  const tableData = Object.values(propertyDetailsResponse.data)[0] ?? [];

  return (
    <div className='p-4'>
      <PropertyDetailsTable columns={propertyDetailsColumns} data={tableData} />
    </div>
  );
}
