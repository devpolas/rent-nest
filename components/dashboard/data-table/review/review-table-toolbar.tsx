import { ReactTable, RowData } from "@tanstack/react-table";
import { TableFeatures } from "../shared/table-features";
import ReviewTableFilter from "./review-table-filter";
import { TableViewOptions } from "../shared/table-column-toggle";

interface ReviewTableToolbarProps<TData extends RowData> {
  table: ReactTable<TableFeatures, TData>;
}

export default function ReviewTableToolbar<TData extends RowData>({
  table,
}: ReviewTableToolbarProps<TData>) {
  return (
    <div className='flex sm:flex-row flex-col sm:justify-between sm:items-center gap-2 bg-brand-surface p-2 rounded'>
      <ReviewTableFilter table={table} />

      <div className='flex justify-end'>
        <TableViewOptions table={table} />
      </div>
    </div>
  );
}
