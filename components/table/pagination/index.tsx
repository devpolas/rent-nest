import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { RowData } from "@tanstack/react-table";

import type { AppTableInstance } from "../../../lib/table/app-table";

interface TablePaginationProps<TData extends RowData> {
  table: AppTableInstance<TData>;
}

export function TablePagination<TData extends RowData>({
  table,
}: TablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.initialState.pagination;

  return (
    <div className='flex justify-between items-center gap-4'>
      <div className='text-muted-foreground text-sm'>
        Page {pageIndex + 1} of {table.getPageCount()}
      </div>

      <div className='flex items-center gap-2'>
        <Select
          value={String(pageSize)}
          onValueChange={(value) => table.setPageSize(Number(value))}
        >
          <SelectTrigger className='w-24'>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {[10, 20, 30, 50, 100].map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant='outline'
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </Button>

        <Button
          variant='outline'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </Button>

        <Button
          variant='outline'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </Button>

        <Button
          variant='outline'
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </Button>
      </div>
    </div>
  );
}
