import { createColumnHelper } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableFeatures } from "../shared/table-features";
import { TableColumnHeader } from "../shared/table-column-header";
import { formatDate } from "@/utils/helpers";
import { PaymentHistory } from "@/types/payment";

const helper = createColumnHelper<TableFeatures, PaymentHistory>();

export const paymentHistoryColumns = helper.columns([
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

  helper.accessor("transactionId", {
    id: "transactionId",

    header: ({ column }) => (
      <TableColumnHeader column={column} title='Transaction' />
    ),

    cell: ({ getValue }) => (
      <span className='font-mono text-sm'>{getValue()}</span>
    ),
  }),

  helper.accessor("amount", {
    id: "amount",

    header: ({ column }) => (
      <TableColumnHeader column={column} title='Amount' />
    ),

    cell: ({ row }) => {
      const { amount, currency } = row.original;

      return (
        <span className='font-medium'>
          {currency.toUpperCase()} {amount.toLocaleString()}
        </span>
      );
    },
  }),

  helper.accessor("status", {
    id: "status",

    header: ({ column }) => (
      <TableColumnHeader column={column} title='Status' />
    ),

    cell: ({ getValue }) => {
      const status = getValue();

      return (
        <span className='font-medium capitalize'>{status.toLowerCase()}</span>
      );
    },
  }),

  helper.accessor("provider", {
    id: "provider",

    header: ({ column }) => (
      <TableColumnHeader column={column} title='Provider' />
    ),

    cell: ({ getValue }) => <span className='font-medium'>{getValue()}</span>,
  }),

  helper.accessor((row) => row.property.title, {
    id: "property",

    header: ({ column }) => (
      <TableColumnHeader column={column} title='Property' />
    ),

    cell: ({ getValue }) => <span className='font-medium'>{getValue()}</span>,
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
            <AvatarFallback>
              {tenant.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className='flex flex-col'>
            <span className='font-medium'>{tenant.name}</span>

            <span className='text-muted-foreground text-xs'>
              {tenant.email}
            </span>
          </div>
        </div>
      );
    },
  }),

  helper.accessor((row) => row.landlord.name, {
    id: "landlordName",

    header: ({ column }) => (
      <TableColumnHeader column={column} title='Landlord' />
    ),

    cell: ({ row }) => {
      const landlord = row.original.landlord;

      return (
        <div className='flex flex-col'>
          <span className='font-medium'>{landlord.name}</span>

          <span className='text-muted-foreground text-xs'>
            {landlord.email}
          </span>
        </div>
      );
    },
  }),

  helper.accessor("expireIn", {
    id: "expireIn",

    header: ({ column }) => (
      <TableColumnHeader column={column} title='Expires' />
    ),

    cell: ({ getValue }) => formatDate(getValue()),
  }),

  helper.accessor("createdAt", {
    id: "createdAt",

    header: ({ column }) => (
      <TableColumnHeader column={column} title='Created' />
    ),

    cell: ({ getValue }) => formatDate(getValue()),
  }),
]);
