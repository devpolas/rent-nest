import { ReactTable, RowData } from "@tanstack/react-table";
import { TableFeatures } from "../shared/table-features";
import { TableViewOptions } from "../shared/table-column-toggle";
import PropertyDetailsFilter from "./property-details-filter";

interface PropertyDetailsToolbarProps<TData extends RowData> {
  table: ReactTable<TableFeatures, TData>;
}

export default function PropertyDetailsToolbar<TData extends RowData>({
  table,
}: PropertyDetailsToolbarProps<TData>) {
  return (
    <div className='flex sm:flex-row flex-col sm:justify-between sm:items-center gap-2 bg-brand-surface p-2 rounded'>
      <PropertyDetailsFilter table={table} />

      <div className='flex justify-end'>
        <TableViewOptions table={table} />
      </div>
    </div>
  );
}
