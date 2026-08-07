/**
 * Central, module-level feature registry for TanStack Table v9.
 *
 * IMPORTANT: this object must be created exactly once, at module scope
 * (not inside a component/hook), so its reference is stable across renders.
 * `useTable` uses this reference for feature-gated typing and to decide
 * which row-model pipelines exist on the instance.
 *
 * Only register what the product actually needs — everything registered
 * here ships in the bundle. Feature order matters: a feature must appear
 * before any row-model / fn-registry slot that depends on it.
 */
import {
  tableFeatures,
  // --- feature plugins (opt-in) ---
  rowSortingFeature,
  columnFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  columnVisibilityFeature,
  // --- row model factories ---
  createCoreRowModel,
  createSortedRowModel,
  createFilteredRowModel,
  createPaginatedRowModel,
  // --- individual fn registrations (tree-shakeable; avoid the full
  //     `sortFns` / `filterFns` barrel exports unless you truly use
  //     every built-in) ---
  sortFn_alphanumeric,
  sortFn_datetime,
  filterFn_includesString,
  filterFn_inNumberRange,
} from "@tanstack/react-table";
import { createTableHook, tableOptions } from "@tanstack/react-table";
import type { RowData, Table } from "@tanstack/react-table";

export const features = tableFeatures({
  // Plugins
  rowSortingFeature,
  columnFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  columnVisibilityFeature,

  // Row model pipeline. Keep these even in "manual"/server-driven mode if
  // you also want the grid to work standalone in Storybook/tests without a
  // server; otherwise they're skipped whenever manualSorting/manualFiltering/
  // manualPagination is set true on a given table instance.
  coreRowModel: createCoreRowModel(),
  sortedRowModel: createSortedRowModel(),
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),

  // Only the sort/filter fns columns actually reference by key.
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    datetime: sortFn_datetime,
  },
  filterFns: {
    includesString: filterFn_includesString,
    inNumberRange: filterFn_inNumberRange,
  },
});

/**
 * Shared table factory. Every grid in the app should call `useAppTable`
 * (not the raw `useTable`) so they all share the same feature set, row
 * models, and fn registries defined in ./features.
 */

const sharedOptions = tableOptions({
  features,
  // App-wide sane defaults; any table can still override these per-instance.
  enableSortingRemoval: false,
  enableRowRangeSelection: true,
} as const);

// export const { useAppTable, createAppColumnHelper } =
//   createTableHook(sharedOptions);

const { useAppTable: baseUseAppTable, createAppColumnHelper } =
  createTableHook(sharedOptions);

export { createAppColumnHelper };

export function useAppTable<
  TData extends RowData,
  TColumns extends readonly unknown[],
>(options: {
  data: TData[];
  columns: TColumns;
  initialState?: unknown;
  enableRowSelection?: boolean;
  enableHiding?: boolean;
}) {
  return baseUseAppTable(options as never);
}

export type AppTableFeatures = typeof features;

// reusable table instance type
export type AppTableInstance<TData extends RowData> = Table<
  AppTableFeatures,
  TData
>;
