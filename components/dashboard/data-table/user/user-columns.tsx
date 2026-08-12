import { User } from "@/types/user";
import { createColumnHelper } from "@tanstack/react-table";
import { TableFeatures } from "../shared/table-features";
import { Checkbox } from "@/components/ui/checkbox";
import { TableColumnHeader } from "../shared/table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatPhone, namePerfect } from "@/utils/helpers";

const helper = createColumnHelper<TableFeatures, User>();

export const userColumns = helper.columns([
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

  helper.accessor("avatar", {
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Avatar' />
    ),
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
    enableHiding: false,
  }),

  helper.accessor("name", {
    header: ({ column }) => <TableColumnHeader column={column} title='Name' />,
    cell: ({ getValue }) => namePerfect(getValue()),
  }),

  helper.accessor("email", {
    header: ({ column }) => <TableColumnHeader column={column} title='Email' />,
    cell: ({ getValue }) => getValue() ?? "—",
  }),

  helper.accessor("phone", {
    header: ({ column }) => <TableColumnHeader column={column} title='Phone' />,
    cell: ({ getValue }) => formatPhone(getValue()),
  }),

  helper.accessor("emailVerified", {
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Verified' />
    ),
    cell: ({ getValue }) => {
      const verified = getValue();

      return verified ? (
        <Badge variant='secondary'>Verified</Badge>
      ) : (
        <Badge variant='destructive'>Not Verified</Badge>
      );
    },
  }),

  helper.accessor("role", {
    header: ({ column }) => <TableColumnHeader column={column} title='Role' />,
    cell: ({ getValue }) => {
      const role = getValue();

      switch (role) {
        case "ADMIN":
          return <Badge variant='secondary'>{role}</Badge>;

        case "LANDLORD":
          return <Badge variant='outline'>{role}</Badge>;

        default:
          return <Badge variant='default'>{role}</Badge>;
      }
    },
  }),

  helper.accessor("status", {
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Status' />
    ),
    cell: ({ getValue }) => {
      const status = getValue();

      switch (status) {
        case "BLOCKED":
        case "BANNED":
        case "DEACTIVATE":
          return <Badge variant='destructive'>{status}</Badge>;

        default:
          return <Badge variant='outline'>{status}</Badge>;
      }
    },
  }),
]);
