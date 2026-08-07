import { Column, RowData } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { AppTableFeatures } from "./app-table";

interface SortableHeaderProps<TData extends RowData, TValue> {
  column: Column<AppTableFeatures, TData, TValue>;
  children: React.ReactNode;
}

export function SortableHeader<TData extends RowData, TValue>({
  column,
  children,
}: SortableHeaderProps<TData, TValue>) {
  const sorted = column.getIsSorted();

  return (
    <button
      type='button'
      className='flex items-center gap-1'
      onClick={column.getToggleSortingHandler()}
    >
      <span>{children}</span>

      {sorted === "asc" && <ArrowUp size={14} />}
      {sorted === "desc" && <ArrowDown size={14} />}
      {sorted === false && <ArrowUpDown size={14} className='opacity-40' />}
    </button>
  );
}
