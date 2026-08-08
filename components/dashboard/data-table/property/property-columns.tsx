import { currencyColumn } from "@/components/table/columns/currency-column";
import { textColumn } from "@/components/table/columns/text-column";
import { createAppColumnHelper } from "@/lib/table/app-table";
import { Property } from "@/types/property";
import { createSelectionColumn } from "../../../table/header/selectable-header";
import { numberColumn } from "@/components/table/columns/number-column";
import { badgeColumn } from "@/components/table/columns/badge-column";
import { dateColumn } from "@/components/table/columns/date-column";
import { actionsColumn } from "@/components/table/columns/actions-column";
import { PropertyActions } from "../../property/property-actions";

const helper = createAppColumnHelper<Property>();

export const propertyColumns = [
  createSelectionColumn<Property>(),
  helper.accessor("title", textColumn<Property, string>({ label: "Title" })),
  helper.accessor(
    "rent",
    currencyColumn<Property, string>({ label: "Rent", currency: "USD" }),
  ),
  helper.accessor(
    "securityDeposit",
    currencyColumn<Property, string>({
      label: "Security Deposit",
      currency: "USD",
    }),
  ),
  helper.accessor("area", numberColumn<Property, string>({ label: "Area" })),
  helper.accessor(
    "bedrooms",
    numberColumn<Property, number>({ label: "Bedrooms" }),
  ),
  helper.accessor(
    "bathrooms",
    numberColumn<Property, number>({ label: "Bathrooms" }),
  ),
  helper.accessor(
    "availability",
    badgeColumn<Property, Property["availability"]>({
      label: "Availability",
      getVariant: (value) => {
        switch (value) {
          case "AVAILABLE":
            return "default";

          case "RENTED":
            return "outline";

          case "PENDING":
            return "secondary";

          case "UNAVAILABLE":
            return "destructive";

          default:
            return "secondary";
        }
      },
    }),
  ),

  helper.accessor(
    "availableFrom",
    dateColumn<Property, string>({ label: "AvailableFrom" }),
  ),

  helper.accessor(
    "status",
    badgeColumn<Property, Property["status"]>({
      label: "Status",
      getVariant: (value) => {
        switch (value) {
          case "PENDING":
            return "default";

          case "APPROVED":
            return "secondary";

          case "REJECTED":
            return "destructive";

          case "RENTED":
            return "outline";

          case "ARCHIVED":
            return "secondary";
          default:
            return "default";
        }
      },
    }),
  ),

  helper.display(
    actionsColumn<Property>({
      header: "Actions",

      render({ row }) {
        const property = row.original;

        return <PropertyActions property={property} />;
      },
    }),
  ),
];
