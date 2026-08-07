"use client";

import { flexRender, type RowData } from "@tanstack/react-table";

import {
  TableBody as ShadcnTableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { AppTableInstance } from "./app-table";

interface TableBodyProps<TData extends RowData> {
  table: AppTableInstance<TData>;
  emptyMessage?: string;
}

export function TableBody<TData extends RowData>({
  table,
  emptyMessage = "No data found",
}: TableBodyProps<TData>) {
  const rows = table.getRowModel().rows;

  if (!rows.length) {
    return (
      <ShadcnTableBody>
        <TableRow>
          <TableCell
            colSpan={table.getVisibleLeafColumns().length}
            className='h-24 text-center'
          >
            {emptyMessage}
          </TableCell>
        </TableRow>
      </ShadcnTableBody>
    );
  }

  return (
    <ShadcnTableBody>
      {rows.map((row) => (
        <TableRow
          key={row.id}
          data-state={row.getIsSelected() ? "selected" : undefined}
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </ShadcnTableBody>
  );
}
