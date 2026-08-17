"use client";

import ActionButton from "@/components/button/action-button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormRhfSelect } from "@/components/rhf-input/form-rfh-select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  PropertyUpdateAdminInputType,
  PropertyAdminUpdateSchema,
} from "@/schemas/property.schema";
import { propertyStaticData } from "../../property/property-static-data";

interface UpdatePropertyStatusFormProps {
  defaultStatus?: PropertyUpdateAdminInputType["status"];
  onSubmit: (data: PropertyUpdateAdminInputType) => void | Promise<void>;
  isPending?: boolean;
}

export default function UpdatePropertyStatusForm({
  defaultStatus,
  onSubmit,
  isPending = false,
}: UpdatePropertyStatusFormProps) {
  const { control, handleSubmit } = useForm<PropertyUpdateAdminInputType>({
    resolver: zodResolver(PropertyAdminUpdateSchema),
    defaultValues: {
      status: defaultStatus,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className='border-brand/10'>
        <CardHeader>
          <CardTitle>Update Property Status</CardTitle>

          <CardDescription>
            Change the approval and lifecycle status of this property.
          </CardDescription>

          <CardAction>
            <ActionButton
              type='submit'
              variant='brand'
              disabled={isPending}
              isLoading={isPending}
              loadingText='Updating...'
            >
              Update Status
            </ActionButton>
          </CardAction>
        </CardHeader>

        <CardContent>
          <FormRhfSelect
            name='status'
            control={control}
            label='Property Status'
            placeholder='Select status'
            options={propertyStaticData.status}
          />
        </CardContent>
      </Card>
    </form>
  );
}
