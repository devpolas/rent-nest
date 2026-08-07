"use client";

import { flexRender, type RowData } from "@tanstack/react-table";
import {
  TableHeader as ShadcnTableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { AppTableInstance } from "../../lib/table/app-table";

interface TableHeaderProps<TData extends RowData> {
  table: AppTableInstance<TData>;
}

export function TableHeader<TData extends RowData>({
  table,
}: TableHeaderProps<TData>) {
  return (
    <ShadcnTableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </ShadcnTableHeader>
  );
}
