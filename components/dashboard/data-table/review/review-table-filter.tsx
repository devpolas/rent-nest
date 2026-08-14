import { type ReactTable, type RowData } from "@tanstack/react-table";
import { TableFeatures } from "../shared/table-features";
import { Input } from "@/components/ui/input";

interface ReviewTableFilterProps<TData extends RowData> {
  table: ReactTable<TableFeatures, TData>;
}

export default function ReviewTableFilter<TData extends RowData>({
  table,
}: ReviewTableFilterProps<TData>) {
  return (
    <div className='w-full sm:w-auto'>
      <Input
        placeholder='Filter tenants...'
        value={
          (table.getColumn("tenantName")?.getFilterValue() as string) ?? ""
        }
        onChange={(event) =>
          table.getColumn("tenantName")?.setFilterValue(event.target.value)
        }
        className='w-full sm:max-w-sm'
      />
    </div>
  );
}
