"use client";

import Loading from "@/app/loading";

import { TableBody } from "@/components/table/table-body";
import { TableHeader } from "@/components/table/table-header";

import { useProperties } from "@/hooks";
import { useAppTable } from "@/lib/table/app-table";

import { propertyColumns } from "./property-columns";

export default function PropertyTable() {
  const { data, isLoading } = useProperties();

  const properties = data?.data?.properties ?? [];

  const table = useAppTable({
    data: properties,
    columns: propertyColumns,

    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },

      columnVisibility: {},
    },

    enableRowSelection: true,
    enableHiding: true,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!data || !data.success || !data.data) {
    return (
      <div className='flex justify-center items-center py-20'>
        {data?.message ?? "Properties not found"}
      </div>
    );
  }

  return (
    <section className='w-full'>
      <div className='border rounded-lg overflow-hidden'>
        <table className='w-full'>
          <TableHeader table={table} />

          <TableBody table={table} />
        </table>
      </div>
    </section>
  );
}
