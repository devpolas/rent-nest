import { ReactTable, RowData } from "@tanstack/react-table";
import { TableViewOptions } from "../shared/table-column-toggle";
import { UserTableFilter } from "./user-table-filter";
import { TableFeatures } from "../shared/table-features";

interface UserTableToolbarProps<TData extends RowData> {
  table: ReactTable<TableFeatures, TData>;
}

export default function UserTableToolbar<TData extends RowData>({
  table,
}: UserTableToolbarProps<TData>) {
  return (
    <div className='flex sm:flex-row flex-col sm:justify-between sm:items-center gap-2 bg-brand-surface p-2 rounded'>
      <UserTableFilter table={table} />

      <div className='flex justify-end'>
        <TableViewOptions table={table} />
      </div>
    </div>
  );
}
