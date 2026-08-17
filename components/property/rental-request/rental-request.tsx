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
import { FormRhfInput } from "@/components/rhf-input/form-rhf-input";
import { useCreateRentalRequest } from "@/hooks";
import ActionButton from "@/components/button/action-button";
import { FormRhfDatePicker } from "@/components/rhf-input/form-rhf-date-picker";
import {
  RentalRequestSchema,
  RentalRequestType,
} from "@/schemas/rental.schema";
import FormRhfTextarea from "@/components/rhf-input/form-rfh-textarea";
import { toast } from "sonner";

interface RentalRequestProps {
  propertyId: string;
  propertyTitle: string;
  rent: number;
  handleClose?: () => void;
}

export default function RentalRequest({
  propertyId,
  propertyTitle,
  rent,
  handleClose,
}: RentalRequestProps) {
  const { control, handleSubmit, watch } = useForm<RentalRequestType>({
    resolver: zodResolver(RentalRequestSchema),
    defaultValues: {
      propertyId,
      moveInDate: undefined,
      leaseDays: undefined,
      message: "",
    },
  });

  const totalLeaseDays = watch("leaseDays");

  const { mutateAsync, isPending } = useCreateRentalRequest();

  async function onSubmit(data: RentalRequestType) {
    try {
      const response = await mutateAsync({
        payload: data,
      });

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
      handleClose?.();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className='px-4'>
        <CardHeader>
          <CardTitle>Make a rental request for {propertyTitle}</CardTitle>

          <CardDescription>
            Please enter the correct information for each field.
          </CardDescription>

          <CardAction>
            <ActionButton
              variant='brand'
              type='submit'
              isLoading={isPending}
              loadingText='Requesting...'
            >
              Confirm $
              {totalLeaseDays
                ? Number(Number(totalLeaseDays) * Number(rent)).toFixed(2)
                : 0}
            </ActionButton>
          </CardAction>
        </CardHeader>

        <CardContent>
          <div className='gap-6 grid'>
            <FormRhfInput
              name='leaseDays'
              type='number'
              placeholder='How many days do you want to rent?'
              label='Lease Days'
              control={control}
            />

            <FormRhfDatePicker
              name='moveInDate'
              control={control}
              label='Move-in Date'
              placeholder='Pick a date'
            />

            <FormRhfTextarea
              name='message'
              placeholder='Enter your message'
              label='Message'
              control={control}
            />
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
