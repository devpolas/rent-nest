import { ReactNode } from "react";

import {
  type CellContext,
  type HeaderContext,
  type RowData,
} from "@tanstack/react-table";
import type { AppTableFeatures } from "../../../lib/table/app-table";
import { SortableHeader } from "../header/sortable-header";
export interface CurrencyColumnOptions<
  TData extends RowData,
  TValue extends number = number,
> {
  label: ReactNode;

  sortable?: boolean;

  fallback?: ReactNode;

  locale?: string;

  currency?: string;

  minimumFractionDigits?: number;

  maximumFractionDigits?: number;

  render?: (
    value: TValue,
    context: CellContext<AppTableFeatures, TData, TValue>,
  ) => ReactNode;
}

export function currencyColumn<
  TData extends RowData,
  TValue extends number = number,
>({
  label,
  sortable = true,
  fallback = "-",
  locale = "en-US",
  currency = "USD",
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
  render,
}: CurrencyColumnOptions<TData, TValue>) {
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

      if (value == null) {
        return fallback;
      }

      if (render) {
        return render(value, context);
      }

      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits,
        maximumFractionDigits,
      }).format(Number(value));
    },
  };
}
