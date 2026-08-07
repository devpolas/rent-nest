import { ReactNode } from "react";

import {
  type CellContext,
  type HeaderContext,
  type RowData,
} from "@tanstack/react-table";

import type { AppTableFeatures } from "../../../lib/table/app-table";

import { SortableHeader } from "../header/sortable-header";

export interface NumberColumnOptions<
  TData extends RowData,
  TValue extends string | number = string | number,
> {
  label: ReactNode;
  sortable?: boolean;
  fallback?: ReactNode;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  render?: (
    value: TValue,
    context: CellContext<AppTableFeatures, TData, TValue>,
  ) => ReactNode;
}

export function numberColumn<
  TData extends RowData,
  TValue extends string | number = string | number,
>({
  label,
  sortable = true,
  fallback = "-",
  locale = "en-US",
  minimumFractionDigits = 0,
  maximumFractionDigits = 2,
  render,
}: NumberColumnOptions<TData, TValue>) {
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

      if (render) {
        return render(value, context);
      }

      return new Intl.NumberFormat(locale, {
        minimumFractionDigits,
        maximumFractionDigits,
      }).format(Number(value));
    },
  };
}
