import { type ReactTable, type RowData } from "@tanstack/react-table";
import { TableFeatures } from "../shared/table-features";
import { Input } from "@/components/ui/input";

interface PropertyTableFilterProps<TData extends RowData> {
  table: ReactTable<TableFeatures, TData>;
}

export default function PropertyTableFilter<TData extends RowData>({
  table,
}: PropertyTableFilterProps<TData>) {
  return (
    <div className='w-full sm:w-auto'>
      <Input
        placeholder='Filter Titles...'
        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("title")?.setFilterValue(event.target.value)
        }
        className='w-full sm:max-w-sm'
      />
    </div>
  );
}
