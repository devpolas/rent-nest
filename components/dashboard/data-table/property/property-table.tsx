"use client";
import { useCreateAtom } from "@tanstack/react-store";
import {
  type CellSelectionState,
  type ColumnDef,
  type PaginationState,
  type RowData,
  type SortingState,
  useTable,
} from "@tanstack/react-table";
import {
  propertyTableFeatures,
  type PropertyTableFeatures,
} from "./property-table-features";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<PropertyTableFeatures, TData>[];
  data: TData[];
}
export default function PropertyTable<TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const cellSelectionAtom = useCreateAtom<CellSelectionState>([]);
  const sortingAtom = useCreateAtom<SortingState>([]);
  const globalFilterAtom = useCreateAtom<string>("");
  const paginationAtom = useCreateAtom<PaginationState>({
    pageIndex: 0, // initial page index
    pageSize: 10, // default page size
  });

  const table = useTable({
    data,
    columns,
    features: propertyTableFeatures,
    atoms: {
      sorting: sortingAtom,
      cellSelection: cellSelectionAtom,
      globalFilter: globalFilterAtom,
      pagination: paginationAtom,
    },
  });

  return (
    <div className='overflow-hidden'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.placeholderId ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                data-state={row.getIsSelected() && "selected"}
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
