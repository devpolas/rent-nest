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
import { FormRhfInput } from "@/components/rhf-input/form-rhf-input";
import { FormRhfDatePicker } from "@/components/rhf-input/form-rhf-date-picker";
import FormRhfTextarea from "@/components/rhf-input/form-rfh-textarea";

import {
  RentalRequestTenantUpdateSchema,
  RentalRequestTenantUpdateType,
} from "@/schemas/rental.schema";

interface RentalRequestUpdateFormProps {
  defaultValues?: Partial<RentalRequestTenantUpdateType>;
  isPending?: boolean;
  onSubmit: (data: RentalRequestTenantUpdateType) => void | Promise<void>;
}

export default function RentalRequestUpdateForm({
  defaultValues,
  isPending = false,
  onSubmit,
}: RentalRequestUpdateFormProps) {
  const { control, handleSubmit } = useForm<RentalRequestTenantUpdateType>({
    resolver: zodResolver(RentalRequestTenantUpdateSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className='border-brand/10'>
        <CardHeader>
          <CardTitle>Update Rental Request</CardTitle>

          <CardDescription>
            Update your rental request information.
          </CardDescription>

          <CardAction>
            <ActionButton
              type='submit'
              variant='brand'
              isLoading={isPending}
              disabled={isPending}
              loadingText='Updating...'
            >
              Update Request
            </ActionButton>
          </CardAction>
        </CardHeader>

        <CardContent className='space-y-5'>
          <FormRhfInput
            name='leaseDays'
            type='number'
            label='Lease Days'
            placeholder='Enter lease days'
            control={control}
          />

          <FormRhfDatePicker
            name='moveInDate'
            label='Move-in Date'
            placeholder='Pick a date'
            control={control}
          />

          <FormRhfTextarea
            name='message'
            label='Message'
            placeholder='Enter your message'
            control={control}
          />
        </CardContent>
      </Card>
    </form>
  );
}
