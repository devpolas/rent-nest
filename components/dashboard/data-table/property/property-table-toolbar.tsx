import { ReactTable, RowData } from "@tanstack/react-table";
import { PropertyTableFeatures } from "./property-table-features";
import PropertyTableFilter from "./property-table-filter";
import { PropertyTableViewOptions } from "./property-table-column-toggle";

interface PropertyTableToolbar<TData extends RowData> {
  table: ReactTable<PropertyTableFeatures, TData>;
}

export default function PropertyTableToolbar<TData extends RowData>({
  table,
}: PropertyTableToolbar<TData>) {
  return (
    <div className='flex justify-between p-4'>
      <PropertyTableFilter table={table} />
      <PropertyTableViewOptions table={table} />
    </div>
  );
}
