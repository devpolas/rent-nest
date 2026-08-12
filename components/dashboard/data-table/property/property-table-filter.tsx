import { type ReactTable, type RowData } from "@tanstack/react-table";
import { TableFeatures } from "../shared/table-features";
import { Input } from "@/components/ui/input";

interface PropertyTableFilter<TData extends RowData> {
  table: ReactTable<TableFeatures, TData>;
}

export default function PropertyTableFilter<TData extends RowData>({
  table,
}: PropertyTableFilter<TData>) {
  return (
    <div className='flex items-center py-4'>
      <Input
        placeholder='Filter Titles...'
        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("title")?.setFilterValue(event.target.value)
        }
        className='max-w-sm'
      />
    </div>
  );
}
