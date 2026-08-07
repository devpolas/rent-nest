import { ReactNode } from "react";

import {
  type CellContext,
  type HeaderContext,
  type RowData,
} from "@tanstack/react-table";
import type { AppTableFeatures } from "../../../lib/table/app-table";
import { SortableHeader } from "../header/sortable-header";
export interface DateColumnOptions<
  TData extends RowData,
  TValue extends string | number | Date = string | number | Date,
> {
  label: ReactNode;
  sortable?: boolean;
  fallback?: ReactNode;
  locale?: string;
  dateStyle?: Intl.DateTimeFormatOptions["dateStyle"];
  timeStyle?: Intl.DateTimeFormatOptions["timeStyle"];
  render?: (
    value: TValue,
    context: CellContext<AppTableFeatures, TData, TValue>,
  ) => ReactNode;
}

export function dateColumn<
  TData extends RowData,
  TValue extends string | number | Date = string | number | Date,
>({
  label,
  sortable = true,
  fallback = "-",
  locale = "en-US",
  dateStyle = "medium",
  timeStyle,
  render,
}: DateColumnOptions<TData, TValue>) {
  const formatter = new Intl.DateTimeFormat(locale, {
    dateStyle,
    timeStyle,
  });

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

      const date = value instanceof Date ? value : new Date(value);

      if (Number.isNaN(date.getTime())) {
        return fallback;
      }

      return formatter.format(date);
    },
  };
}
