import { PropertyDetail } from "@/types/property";
import { createColumnHelper } from "@tanstack/react-table";
import { TableFeatures } from "../shared/table-features";
import { Checkbox } from "@/components/ui/checkbox";
import { TableColumnHeader } from "../shared/table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { namePerfect } from "@/utils/helpers";

const helper = createColumnHelper<TableFeatures, PropertyDetail>();

export const propertyDetailsColumns = helper.columns([
  helper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),

  helper.accessor("icon", {
    header: ({ column }) => <TableColumnHeader column={column} title='Icon' />,
    cell: ({ getValue }) => {
      const url = getValue();

      return (
        <Avatar>
          <AvatarImage src={url ?? undefined} />
          <AvatarFallback>RN</AvatarFallback>
        </Avatar>
      );
    },
    enableSorting: false,
  }),

  helper.accessor("name", {
    header: ({ column }) => <TableColumnHeader column={column} title='Name' />,
    cell: ({ getValue }) => namePerfect(getValue()),
  }),
]);
