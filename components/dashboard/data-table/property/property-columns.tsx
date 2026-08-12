"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { TableFeatures } from "../shared/table-features";
import { type Category, type PropertyResponse } from "@/types/property";
import { Checkbox } from "@/components/ui/checkbox";
import { TableColumnHeader } from "../shared/table-column-header";
import { AvailabilityStatus, PropertyStatus } from "@/types/enum";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/helpers";
import { PropertyDetailsList } from "./property-details-list";
import { LocationView } from "../shared/location-view";

const helper = createColumnHelper<TableFeatures, PropertyResponse>();

const propertyColumns = helper.columns([
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

  helper.accessor("title", {
    header: ({ column }) => <TableColumnHeader column={column} title='Title' />,
    cell: ({ getValue }) => getValue(),
  }),

  helper.accessor("category", {
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Category' />
    ),
    cell: ({ getValue }) => {
      const category: Category = getValue();
      return category.name;
    },
  }),

  helper.accessor("rent", {
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Rent/Day' />
    ),
    cell: ({ getValue }) => {
      const amount = Number(getValue());
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return formatted;
    },
  }),
  helper.accessor("securityDeposit", {
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Security Deposit' />
    ),
    cell: ({ getValue }) => {
      const amount = Number(getValue());
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return formatted;
    },
  }),

  helper.accessor("area", {
    header: ({ column }) => (
      <TableColumnHeader column={column} title={`Area (sqft)`} />
    ),
    cell: ({ getValue }) => getValue(),
  }),

  helper.accessor("bedrooms", {
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Bedrooms' />
    ),
    cell: ({ getValue }) => getValue(),
  }),

  helper.accessor("bathrooms", {
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Bathrooms' />
    ),
    cell: ({ getValue }) => getValue(),
  }),

  helper.accessor("availability", {
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Availability' />
    ),

    cell: ({ getValue }) => {
      const value: AvailabilityStatus = getValue();

      const variantMap: Record<
        AvailabilityStatus,
        "default" | "outline" | "secondary" | "destructive"
      > = {
        AVAILABLE: "outline",
        RENTED: "destructive",
        UNAVAILABLE: "secondary",
        RESERVED: "secondary",
      };

      return <Badge variant={variantMap[value]}>{value}</Badge>;
    },
  }),

  helper.accessor("availableFrom", {
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Available From' />
    ),
    cell: ({ getValue }) => {
      const value = getValue();
      const formattedDate = formatDate(new Date(String(value)));
      return formattedDate;
    },
  }),

  helper.accessor("status", {
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Status' />
    ),
    cell: ({ getValue }) => {
      const value: PropertyStatus = getValue();
      const variantMap: Record<
        PropertyStatus,
        "default" | "outline" | "secondary" | "destructive"
      > = {
        PENDING: "outline",
        APPROVED: "default",
        REJECTED: "destructive",
        RENTED: "secondary",
        ARCHIVED: "secondary",
      };
      return <Badge variant={variantMap[value]}>{value}</Badge>;
    },
  }),

  helper.accessor("amenities", {
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Amenities' />
    ),
    cell: ({ getValue }) => {
      const amenities = getValue();

      return (
        <PropertyDetailsList
          title='Amenities'
          details={amenities}
          getName={(item) => item.amenity.name}
        />
      );
    },
  }),

  helper.accessor("features", {
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Features' />
    ),
    cell: ({ getValue }) => {
      const features = getValue();
      return (
        <PropertyDetailsList
          title='Features'
          details={features}
          getName={(item) => item.feature.name}
        />
      );
    },
  }),

  helper.accessor("rules", {
    header: ({ column }) => <TableColumnHeader column={column} title='Rules' />,

    cell: ({ getValue }) => {
      const rules = getValue();
      return (
        <PropertyDetailsList
          title='Rules'
          details={rules}
          getName={(item) => item.rule.name}
        />
      );
    },
  }),

  helper.accessor("location", {
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Location' />
    ),

    cell: ({ getValue }) => {
      const location = getValue();

      return <LocationView location={location} />;
    },
  }),

  helper.accessor("createdAt", {
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Created At' />
    ),
    cell: ({ getValue }) => {
      const value = getValue();
      const formattedDate = formatDate(new Date(value));
      return formattedDate;
    },
  }),
]);

export default propertyColumns;
