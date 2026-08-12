import { ReactTable, RowData } from "@tanstack/react-table";
import { TableViewOptions } from "../shared/table-column-toggle";
import { UserTableFilter } from "./user-table-filter";
import { TableFeatures } from "../shared/table-features";

interface UserTableToolbar<TData extends RowData> {
  table: ReactTable<TableFeatures, TData>;
}

export default function UserTableToolbar<TData extends RowData>({
  table,
}: UserTableToolbar<TData>) {
  return (
    <div className='flex justify-between bg-brand-surface p-2 rounded'>
      <UserTableFilter table={table} />
      <TableViewOptions table={table} />
    </div>
  );
}
