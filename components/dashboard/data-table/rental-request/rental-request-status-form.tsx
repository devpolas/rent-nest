"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import ActionButton from "@/components/button/action-button";
import { FormRhfSelect } from "@/components/rhf-input/form-rfh-select";

import {
  AdminAndOwnerUpdateSchema,
  RentalRequestAdminAndOwnerUpdateType,
} from "@/schemas/rental.schema";

const statusOptions = [
  {
    label: "Pending",
    value: "PENDING",
  },
  {
    label: "Approved",
    value: "APPROVED",
  },
  {
    label: "Rejected",
    value: "REJECTED",
  },
  {
    label: "Payment Pending",
    value: "PAYMENT_PENDING",
  },
  {
    label: "Active",
    value: "ACTIVE",
  },
  {
    label: "Completed",
    value: "COMPLETED",
  },
  {
    label: "Cancelled",
    value: "CANCELLED",
  },
];

interface RentalRequestStatusFormProps {
  defaultStatus?: RentalRequestAdminAndOwnerUpdateType["status"];
  isPending?: boolean;
  onSubmit: (
    data: RentalRequestAdminAndOwnerUpdateType,
  ) => void | Promise<void>;
}

export default function RentalRequestStatusForm({
  defaultStatus,
  isPending = false,
  onSubmit,
}: RentalRequestStatusFormProps) {
  const { control, handleSubmit } =
    useForm<RentalRequestAdminAndOwnerUpdateType>({
      resolver: zodResolver(AdminAndOwnerUpdateSchema),
      defaultValues: {
        status: defaultStatus,
      },
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className='border-brand/10'>
        <CardHeader>
          <CardTitle>Update Rental Status</CardTitle>

          <CardDescription>
            Change the status of this rental request.
          </CardDescription>

          <CardAction>
            <ActionButton
              type='submit'
              variant='brand'
              isLoading={isPending}
              disabled={isPending}
              loadingText='Updating...'
            >
              Update Status
            </ActionButton>
          </CardAction>
        </CardHeader>

        <CardContent>
          <FormRhfSelect
            name='status'
            label='Status'
            control={control}
            options={statusOptions}
            placeholder='Select status'
          />
        </CardContent>
      </Card>
    </form>
  );
}
