"use client";

import {
  CellSelectionState,
  ColumnDef,
  PaginationState,
  RowData,
  SortingState,
  useTable,
} from "@tanstack/react-table";
import { dataTableFeatures, TableFeatures } from "../shared/table-features";
import { useCreateAtom } from "@tanstack/react-store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TablePagination } from "../shared/table-pagination";
import PropertyDetailsToolbar from "./property-details-toolbar";

interface PropertyDetailsProps<TData extends RowData> {
  columns: ColumnDef<TableFeatures, TData>[];
  data: TData[];
}

export default function PropertyDetailsTable<TData extends RowData>({
  columns,
  data,
}: PropertyDetailsProps<TData>) {
  const cellSelectionAtom = useCreateAtom<CellSelectionState>([]);
  const sortingAtom = useCreateAtom<SortingState>([]);
  const globalFilterAtom = useCreateAtom<string>("");
  const paginationAtom = useCreateAtom<PaginationState>({
    pageIndex: 0, // initial page index
    pageSize: 15, // default page size
  });

  const table = useTable({
    data,
    columns,
    features: dataTableFeatures,
    atoms: {
      sorting: sortingAtom,
      cellSelection: cellSelectionAtom,
      globalFilter: globalFilterAtom,
      pagination: paginationAtom,
    },
  });

  return (
    <div className='overflow-hidden'>
      <div>
        <PropertyDetailsToolbar table={table} />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.placeholderId ? null : (
                    <table.FlexRender header={header} />
                  )}
                </TableHead>
              ))}
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
      <TablePagination table={table} />
    </div>
  );
}
