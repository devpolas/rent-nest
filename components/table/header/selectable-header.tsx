import { RowData } from "@tanstack/react-table";
import { createAppColumnHelper } from "../../../lib/table/app-table";

export function createSelectionColumn<T extends RowData>() {
  const helper = createAppColumnHelper<T>();

  return helper.display({
    id: "select",
    enableHiding: false,
    enableSorting: false,
    enableColumnFilter: false,

    header: ({ table }) => (
      <input
        type='checkbox'
        checked={table.getIsAllRowsSelected()}
        ref={(el) => {
          if (el) {
            el.indeterminate =
              table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected();
          }
        }}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),

    cell: ({ row }) => (
      <input
        type='checkbox'
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        ref={(el) => {
          if (el) {
            el.indeterminate = row.getIsSomeSelected() && !row.getIsSelected();
          }
        }}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  });
}
