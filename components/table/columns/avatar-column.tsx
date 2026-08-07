import { ReactNode } from "react";
import {
  type CellContext,
  type HeaderContext,
  type RowData,
} from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { AppTableFeatures } from "../app-table";
import { SortableHeader } from "../sortable-header";

export interface AvatarColumnOptions<TData extends RowData, TValue = string> {
  label: ReactNode;

  sortable?: boolean;

  size?: number;

  fallback?: string;

  /**
   * Display a name beside the avatar.
   */
  getName?: (
    value: TValue,
    context: CellContext<AppTableFeatures, TData, TValue>,
  ) => ReactNode;

  /**
   * Generate initials when no image exists.
   */
  getFallback?: (
    value: TValue,
    context: CellContext<AppTableFeatures, TData, TValue>,
  ) => string;
}

export function avatarColumn<TData extends RowData, TValue = string>({
  label,
  sortable = true,
  size = 36,
  fallback = "NA",
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
      const image = context.getValue();

      const initials = getFallback?.(image, context) ?? fallback;

      return (
        <div className='flex items-center gap-3'>
          <Avatar
            style={{
              width: size,
              height: size,
            }}
          >
            <AvatarImage src={image ? String(image) : undefined} />

            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          {getName && (
            <span className='truncate'>{getName(image, context)}</span>
          )}
        </div>
      );
    },
  };
}
