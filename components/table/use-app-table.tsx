// "use client";

// import type { ColumnDef, RowData } from "@tanstack/react-table";

// import { type AppTableFeatures, useAppTable } from "../../lib/table/app-table";

// export interface UseTableOptions<
//   TData extends RowData,
//   TColumns extends readonly ColumnDef<AppTableFeatures, TData, never>[],
// > {
//   data: TData[];

//   columns: TColumns;

//   pageSize?: number;

//   enableRowSelection?: boolean;

//   enableColumnVisibility?: boolean;
// }

// export function useTable<
//   TData extends RowData,
//   TColumns extends readonly ColumnDef<AppTableFeatures, TData, unknown>[],
// >({
//   data,
//   columns,
//   pageSize = 10,
//   enableRowSelection = true,
//   enableColumnVisibility = true,
// }: UseTableOptions<TData, TColumns, unknown>) {
//   return useAppTable({
//     data,
//     columns,

//     initialState: {
//       pagination: {
//         pageIndex: 0,
//         pageSize,
//       },

//       columnVisibility: {},
//     },

//     enableRowSelection,

//     enableHiding: enableColumnVisibility,
//   });
// }
