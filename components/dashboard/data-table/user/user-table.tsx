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
import UserTableToolbar from "./user-table-toolbar";

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<TableFeatures, TData>[];
  data: TData[];
}

export default function UserTable<TData extends RowData>({
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
    features: dataTableFeatures,
    atoms: {
      cellSelection: cellSelectionAtom,
      globalFilter: globalFilterAtom,
      sorting: sortingAtom,
      pagination: paginationAtom,
    },
  });
  return (
    <div className='overflow-hidden'>
      <div>
        <UserTableToolbar table={table} />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroups) => (
            <TableRow key={headerGroups.id}>
              {headerGroups.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : (
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
