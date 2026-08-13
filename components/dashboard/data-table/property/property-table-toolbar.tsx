import { ReactTable, RowData } from "@tanstack/react-table";
import { TableFeatures } from "../shared/table-features";
import PropertyTableFilter from "./property-table-filter";
import { TableViewOptions } from "../shared/table-column-toggle";

interface PropertyTableToolbarProps<TData extends RowData> {
  table: ReactTable<TableFeatures, TData>;
}

export default function PropertyTableToolbar<TData extends RowData>({
  table,
}: PropertyTableToolbarProps<TData>) {
  return (
    <div className='flex sm:flex-row flex-col sm:justify-between sm:items-center gap-2 bg-brand-surface p-2 rounded'>
      <PropertyTableFilter table={table} />

      <div className='flex justify-end'>
        <TableViewOptions table={table} />
      </div>
    </div>
  );
}
