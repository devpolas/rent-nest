import { ReactTable, RowData } from "@tanstack/react-table";
import { TableFeatures } from "../shared/table-features";
import { Input } from "@/components/ui/input";

interface PropertyDetailsFilterProps<TData extends RowData> {
  table: ReactTable<TableFeatures, TData>;
}

export default function PropertyDetailsFilter<TData extends RowData>({
  table,
}: PropertyDetailsFilterProps<TData>) {
  const nameColumn = table.getColumn("name");

  return (
    <div className='w-full sm:w-auto'>
      <Input
        placeholder='Search with name'
        value={(nameColumn?.getFilterValue() as string) ?? ""}
        onChange={(event) => nameColumn?.setFilterValue(event.target.value)}
        className='w-full sm:max-w-sm'
      />
    </div>
  );
}
