export type DataTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData>[];

  loading?: boolean;

  pageCount?: number;

  searchKey?: keyof TData;

  toolbar?: React.ReactNode;
};
