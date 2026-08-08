"use client";

import Loading from "@/app/loading";
import { TableBody } from "@/components/table/table-body";
import { TableHeader } from "@/components/table/table-header";
import { useProperties } from "@/hooks";
import { useAppTable } from "@/lib/table/app-table";
import { propertyColumns } from "./property-columns";
import { Table } from "@/components/ui/table";
import { TablePagination } from "@/components/table/pagination";
import { TableToolbar } from "@/components/table/toolbar/table-toolbar";
import React from "react";
import { ColumnFiltersState } from "@tanstack/react-table";

export default function PropertyTable() {
  const { data, isLoading } = useProperties();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const properties = data?.data?.properties ?? [];

  const table = useAppTable({
    data: properties,
    columns: propertyColumns,

    initialState: {
      onColumnFiltersChange: setColumnFilters,
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },

      columnVisibility: {},
      columnFilters: {},
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
    <section className='p-4 w-full'>
      <div className='px-4 border rounded-lg overflow-hidden'>
        <TableToolbar searchColumn='tt' table={table} />
        <Table className='w-full'>
          <TableHeader table={table} />

          <TableBody table={table} />
        </Table>
        <TablePagination table={table} />
      </div>
    </section>
  );
}
