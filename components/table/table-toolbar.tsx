"use client";

import type { ReactNode } from "react";
import type { RowData } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Settings2 } from "lucide-react";
import type { AppTableInstance } from "./app-table";

interface TableToolbarProps<TData extends RowData> {
  table: AppTableInstance<TData>;
  searchColumn?: string;
  searchPlaceholder?: string;
  children?: ReactNode;
}

export function TableToolbar<TData extends RowData>({
  table,
  searchColumn,
  searchPlaceholder = "Search...",
  children,
}: TableToolbarProps<TData>) {
  const columnFilters = table.initialState.columnFilters;
  const isFiltered = columnFilters.length > 0;

  const searchValue = searchColumn
    ? String(table.getColumn(searchColumn)?.getFilterValue() ?? "")
    : "";

  return (
    <div className='flex justify-between items-center gap-4 py-4'>
      {/* Search */}
      <div className='flex items-center gap-2'>
        {searchColumn && (
          <Input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(event) =>
              table.getColumn(searchColumn)?.setFilterValue(event.target.value)
            }
            className='w-62.5'
          />
        )}

        {isFiltered && (
          <Button variant='ghost' onClick={() => table.resetColumnFilters()}>
            Clear
          </Button>
        )}
      </div>

      {/* Actions */}
      <div className='flex items-center gap-2'>
        {children}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='gap-2'>
              <Settings2 size={16} />
              Columns
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align='end'>
            {table
              .getAllLeafColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={() => column.toggleVisibility()}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
