import { createColumnHelper } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { RentalRequestResponse } from "@/types/rental-request";
import { TableFeatures } from "../shared/table-features";
import { TableColumnHeader } from "../shared/table-column-header";
import { formatDate } from "@/utils/helpers";
import RentalRequestActions from "./rental-request-actions";

const helper = createColumnHelper<TableFeatures, RentalRequestResponse>();

export const rentalRequestColumns = helper.columns([
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

  helper.accessor((row) => row.tenant.name, {
    id: "tenantName",

    header: ({ column }) => (
      <TableColumnHeader column={column} title='Tenant' />
    ),

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

  helper.accessor("message", {
    id: "message",

    header: ({ column }) => (
      <TableColumnHeader column={column} title='Message' />
    ),

    cell: ({ getValue }) => (
      <div className='max-w-[300px] truncate'>{getValue()}</div>
    ),
  }),

  helper.accessor("moveInDate", {
    id: "moveInDate",

    header: ({ column }) => (
      <TableColumnHeader column={column} title='Move In' />
    ),

    cell: ({ getValue }) => formatDate(getValue()),
  }),

  helper.accessor("leaseDays", {
    id: "leaseDays",

    header: ({ column }) => <TableColumnHeader column={column} title='Lease' />,

    cell: ({ getValue }) => <span>{getValue()} days</span>,
  }),

  helper.accessor("status", {
    id: "status",

    header: ({ column }) => (
      <TableColumnHeader column={column} title='Status' />
    ),

    cell: ({ getValue }) => {
      const status = getValue();

      return (
        <span className='font-medium capitalize'>
          {status.toLowerCase().replaceAll("_", " ")}
        </span>
      );
    },
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
  helper.display({
    id: "actions",

    header: "Actions",

    cell: ({ row }) => <RentalRequestActions rentalRequest={row.original} />,

    enableSorting: false,
    enableHiding: false,
  }),
]);
