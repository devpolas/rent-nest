import { ReactNode } from "react";

import {
  type CellContext,
  type HeaderContext,
  type RowData,
} from "@tanstack/react-table";

import { Progress } from "@/components/ui/progress";
import type { AppTableFeatures } from "../app-table";
import { SortableHeader } from "../sortable-header";

export interface ProgressColumnOptions<
  TData extends RowData,
  TValue extends number = number,
> {
  label: ReactNode;
  sortable?: boolean;
  fallback?: ReactNode;
  showValue?: boolean;
  renderValue?: (
    value: TValue,
    context: CellContext<AppTableFeatures, TData, TValue>,
  ) => ReactNode;
}

export function progressColumn<
  TData extends RowData,
  TValue extends number = number,
>({
  label,
  sortable = true,
  fallback = "-",
  showValue = true,
  renderValue,
}: ProgressColumnOptions<TData, TValue>) {
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
      const progress = Math.min(100, Math.max(0, Number(value)));
      return (
        <div className='flex items-center gap-3 min-w-40'>
          <Progress value={progress} className='flex-1' />

          {showValue && (
            <span className='text-muted-foreground text-sm whitespace-nowrap'>
              {renderValue ? renderValue(value, context) : `${progress}%`}
            </span>
          )}
        </div>
      );
    },
  };
}
