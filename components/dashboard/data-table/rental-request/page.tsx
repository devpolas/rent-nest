"use client";
import { useRentalRequests } from "@/hooks";
import Loading from "@/app/loading";
import RentalTable from "./rental-request-table";
import { rentalRequestColumns } from "./rental-request-columns";

export default function DashboardRentalTable() {
  const { data: rentalResponse, isLoading } = useRentalRequests();

  if (isLoading) {
    return <Loading />;
  }

  if (!rentalResponse || !rentalResponse.success || !rentalResponse.data) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <p className='text-muted-foreground'>
          {rentalResponse?.message ?? "Properties not found"}
        </p>
      </div>
    );
  }
  const rents = rentalResponse?.data?.rents ?? [];

  return (
    <div className='p-4'>
      <RentalTable data={rents} columns={rentalRequestColumns} />
    </div>
  );
}
