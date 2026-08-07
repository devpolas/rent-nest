"use client";

import { flexRender, type RowData } from "@tanstack/react-table";
import {
  TableFooter as ShadcnTableFooter,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { AppTableInstance } from "../../lib/table/app-table";
interface TableFooterProps<TData extends RowData> {
  table: AppTableInstance<TData>;
}

export function TableFooter<TData extends RowData>({
  table,
}: TableFooterProps<TData>) {
  const footerGroups = table.getFooterGroups();

  if (!footerGroups.length) {
    return null;
  }

  return (
    <ShadcnTableFooter>
      {footerGroups.map((footerGroup) => (
        <TableRow key={footerGroup.id}>
          {footerGroup.headers.map((header) => (
            <TableCell key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.footer,
                    header.getContext(),
                  )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </ShadcnTableFooter>
  );
}
