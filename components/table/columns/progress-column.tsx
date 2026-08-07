import { ReactNode } from "react";
import {
  type CellContext,
  type HeaderContext,
  type RowData,
} from "@tanstack/react-table";
import { Progress } from "@/components/ui/progress";
import type { AppTableFeatures } from "../../../lib/table/app-table";
import { SortableHeader } from "../header/sortable-header";

export interface ProgressColumnOptions<
  TData extends RowData,
  TValue extends string | number = string | number,
> {
  label: ReactNode;
  sortable?: boolean;
  fallback?: ReactNode;
  showValue?: boolean;
  min?: number;
  max?: number;
  renderValue?: (
    value: TValue,
    context: CellContext<AppTableFeatures, TData, TValue>,
  ) => ReactNode;
}

export function progressColumn<
  TData extends RowData,
  TValue extends string | number = string | number,
>({
  label,
  sortable = true,
  fallback = "-",
  showValue = true,
  min = 0,
  max = 100,
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

      if (value == null || value === "") {
        return fallback;
      }

      const progress = Math.min(max, Math.max(min, Number(value)));

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
