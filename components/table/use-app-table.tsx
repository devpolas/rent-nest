"use client";

import { type ColumnDef, type RowData } from "@tanstack/react-table";
import { AppTableFeatures, useAppTable } from "../../lib/table/app-table";
export interface UseTableOptions<TData extends RowData> {
  data: TData[];
  columns: ColumnDef<AppTableFeatures, TData, unknown>[];
  /**
   * Default page size
   */
  pageSize?: number;
  /**
   * Enable row selection
   */
  enableRowSelection?: boolean;
  /**
   * Enable column visibility
   */
  enableColumnVisibility?: boolean;
}

export function useTable<TData extends RowData>({
  data,
  columns,
  pageSize = 10,
  enableRowSelection = true,
  enableColumnVisibility = true,
}: UseTableOptions<TData>) {
  const table = useAppTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize,
      },
      columnVisibility: {},
    },
    enableRowSelection,
    enableHiding: enableColumnVisibility,
  });

  return table;
}
