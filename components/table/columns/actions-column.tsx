import { ReactNode } from "react";
import { type CellContext, type RowData } from "@tanstack/react-table";
import type { AppTableFeatures } from "../../../lib/table/app-table";

export interface ActionsColumnOptions<TData extends RowData> {
  id?: string;
  header?: ReactNode;
  render: (context: CellContext<AppTableFeatures, TData, unknown>) => ReactNode;
}

export function actionsColumn<TData extends RowData>({
  id = "actions",
  header = "Actions",
  render,
}: ActionsColumnOptions<TData>) {
  return {
    id,
    enableSorting: false,
    enableColumnFilter: false,
    enableHiding: false,
    enableResizing: false,
    header() {
      return header;
    },
    cell(context: CellContext<AppTableFeatures, TData, unknown>) {
      return render(context);
    },
  };
}
