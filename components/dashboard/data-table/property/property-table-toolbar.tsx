import { ReactTable, RowData } from "@tanstack/react-table";
import { TableFeatures } from "../shared/table-features";
import PropertyTableFilter from "./property-table-filter";
import { TableViewOptions } from "../shared/table-column-toggle";

interface PropertyTableToolbar<TData extends RowData> {
  table: ReactTable<TableFeatures, TData>;
}

export default function PropertyTableToolbar<TData extends RowData>({
  table,
}: PropertyTableToolbar<TData>) {
  return (
    <div className='flex justify-between bg-brand-surface p-2 rounded'>
      <PropertyTableFilter table={table} />
      <TableViewOptions table={table} />
    </div>
  );
}
