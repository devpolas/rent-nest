import { createColumnHelper } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ReviewResponse } from "@/types/review";
import { TableFeatures } from "../shared/table-features";
import { TableColumnHeader } from "../shared/table-column-header";
import { formatDate } from "@/utils/helpers";

const helper = createColumnHelper<TableFeatures, ReviewResponse>();

export const reviewColumns = helper.columns([
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

  helper.accessor("rating", {
    id: "rating",

    header: ({ column }) => (
      <TableColumnHeader column={column} title='Rating' />
    ),

    cell: ({ getValue }) => <span className='font-medium'>{getValue()}/5</span>,
  }),

  helper.accessor("comment", {
    id: "comment",

    header: ({ column }) => (
      <TableColumnHeader column={column} title='Comment' />
    ),

    cell: ({ getValue }) => (
      <div className='max-w-[300px] truncate'>{getValue()}</div>
    ),
  }),

  helper.accessor((row) => row.tenant.name, {
    id: "tenantName",

    header: ({ column }) => <TableColumnHeader column={column} title='Name' />,

    cell: ({ row }) => {
      const tenant = row.original.tenant;

      return (
        <div className='flex items-center gap-2'>
          <Avatar className='size-8'>
            <AvatarImage src={tenant.avatar ?? undefined} alt={tenant.name} />

            <AvatarFallback>
              {tenant.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <span className='font-medium'>{tenant.name}</span>
        </div>
      );
    },
  }),

  helper.accessor((row) => row.tenant.email, {
    id: "tenantEmail",

    header: ({ column }) => <TableColumnHeader column={column} title='Email' />,

    cell: ({ getValue }) => (
      <span className='text-muted-foreground'>{getValue()}</span>
    ),
  }),

  helper.accessor((row) => row.property.title, {
    id: "property",

    header: ({ column }) => (
      <TableColumnHeader column={column} title='Property' />
    ),

    cell: ({ getValue }) => <span className='font-medium'>{getValue()}</span>,
  }),

  helper.accessor("createdAt", {
    id: "createdAt",

    header: ({ column }) => (
      <TableColumnHeader column={column} title='Created' />
    ),

    cell: ({ getValue }) => formatDate(getValue()),
  }),

  helper.accessor("updatedAt", {
    id: "updatedAt",

    header: ({ column }) => (
      <TableColumnHeader column={column} title='Updated' />
    ),

    cell: ({ getValue }) => formatDate(getValue()),
  }),
]);
