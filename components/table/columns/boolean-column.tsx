import { ReactNode } from "react";

import {
  type CellContext,
  type HeaderContext,
  type RowData,
} from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import type { AppTableFeatures } from "../app-table";
import { SortableHeader } from "../sortable-header";

export interface BooleanColumnOptions<TData extends RowData> {
  label: ReactNode;
  sortable?: boolean;
  fallback?: ReactNode;
  trueLabel?: ReactNode;
  falseLabel?: ReactNode;
  trueVariant?: "default" | "secondary" | "destructive" | "outline";
  falseVariant?: "default" | "secondary" | "destructive" | "outline";
  render?: (
    value: boolean,
    context: CellContext<AppTableFeatures, TData, boolean>,
  ) => ReactNode;
}

export function booleanColumn<TData extends RowData>({
  label,
  sortable = true,
  fallback = "-",
  trueLabel = "Yes",
  falseLabel = "No",
  trueVariant = "default",
  falseVariant = "secondary",

  render,
}: BooleanColumnOptions<TData>) {
  return {
    enableSorting: sortable,

    header({ column }: HeaderContext<AppTableFeatures, TData, boolean>) {
      return sortable ? (
        <SortableHeader column={column}>{label}</SortableHeader>
      ) : (
        label
      );
    },
    cell(context: CellContext<AppTableFeatures, TData, boolean>) {
      const value = context.getValue();
      if (value == null) {
        return fallback;
      }
      if (render) {
        return render(value, context);
      }
      return (
        <Badge variant={value ? trueVariant : falseVariant}>
          {value ? trueLabel : falseLabel}
        </Badge>
      );
    },
  };
}
