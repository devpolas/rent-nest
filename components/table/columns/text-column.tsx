import { ReactNode } from "react";

import {
  type CellContext,
  type HeaderContext,
  type RowData,
} from "@tanstack/react-table";
import type { AppTableFeatures } from "../app-table";
import { SortableHeader } from "../sortable-header";
export interface TextColumnOptions<TData extends RowData, TValue = unknown> {
  label: ReactNode;
  sortable?: boolean;
  fallback?: ReactNode;
  render?: (
    value: TValue,
    context: CellContext<AppTableFeatures, TData, TValue>,
  ) => ReactNode;
}

export function textColumn<TData extends RowData, TValue = unknown>({
  label,
  sortable = true,
  fallback = "-",
  render,
}: TextColumnOptions<TData, TValue>) {
  return {
    enableSorting: sortable,

    header({ column }: HeaderContext<AppTableFeatures, TData, TValue>) {
      return sortable ? (
        <SortableHeader column={column}>{label}</SortableHeader>
      ) : (
        label
      );
    },

    cell(context: CellContext<AppTableFeatures, TData, TValue>) {
      const value = context.getValue();

      if (value == null || value === "") {
        return fallback;
      }

      return render ? render(value, context) : String(value);
    },
  };
}
