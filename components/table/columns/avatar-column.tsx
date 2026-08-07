import { ReactNode } from "react";
import {
  type CellContext,
  type HeaderContext,
  type RowData,
} from "@tanstack/react-table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { AppTableFeatures } from "../../../lib/table/app-table";
import { SortableHeader } from "../header/sortable-header";

export interface AvatarColumnOptions<TData extends RowData, TValue = unknown> {
  label: ReactNode;
  sortable?: boolean;
  size?: number;
  fallback?: string;
  getImage?: (
    value: TValue,
    context: CellContext<AppTableFeatures, TData, TValue>,
  ) => string | undefined;
  getName?: (
    value: TValue,
    context: CellContext<AppTableFeatures, TData, TValue>,
  ) => ReactNode;
  getFallback?: (
    value: TValue,
    context: CellContext<AppTableFeatures, TData, TValue>,
  ) => string;
}

export function avatarColumn<TData extends RowData, TValue = unknown>({
  label,
  sortable = true,
  size = 36,
  fallback = "NA",
  getImage,
  getName,
  getFallback,
}: AvatarColumnOptions<TData, TValue>) {
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
      const image = getImage ? getImage(value, context) : String(value ?? "");
      const initials = getFallback ? getFallback(value, context) : fallback;

      return (
        <div className='flex items-center gap-3'>
          <Avatar
            style={{
              width: size,
              height: size,
            }}
          >
            <AvatarImage src={image || undefined} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          {getName && (
            <span className='truncate'>{getName(value, context)}</span>
          )}
        </div>
      );
    },
  };
}
