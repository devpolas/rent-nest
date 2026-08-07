import { ReactNode } from "react";

import {
  type CellContext,
  type HeaderContext,
  type RowData,
} from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import type { AppTableFeatures } from "../../../lib/table/app-table";
import { SortableHeader } from "../header/sortable-header";

export interface BadgeColumnOptions<TData extends RowData, TValue = unknown> {
  label: ReactNode;
  sortable?: boolean;
  fallback?: ReactNode;
  /**
   * Badge variant.
   * Defaults to "secondary".
   */
  variant?: "default" | "secondary" | "destructive" | "outline";
  /**
   * Custom formatter.
   */
  format?: (
    value: TValue,
    context: CellContext<AppTableFeatures, TData, TValue>,
  ) => ReactNode;
  /**
   * Dynamic badge variant.
   */
  getVariant?: (
    value: TValue,
    context: CellContext<AppTableFeatures, TData, TValue>,
  ) => "default" | "secondary" | "destructive" | "outline";
}

export function badgeColumn<TData extends RowData, TValue = unknown>({
  label,
  sortable = true,
  fallback = "-",
  variant = "secondary",
  format,
  getVariant,
}: BadgeColumnOptions<TData, TValue>) {
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

      return (
        <Badge variant={getVariant ? getVariant(value, context) : variant}>
          {format ? format(value, context) : String(value)}
        </Badge>
      );
    },
  };
}
