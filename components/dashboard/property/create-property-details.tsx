"use client";
import ActionButton from "@/components/button/action-button";
import { FormRhfInput } from "@/components/rhf-input/form-rhf-input";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCreatePropertyDetails } from "@/hooks";
import {
  PropertyDetailsSchema,
  PropertyDetailsType,
} from "@/schemas/property.schema";
import { PropertyDetailsMap } from "@/types/property";
import { namePerfect } from "@/utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CreatePropertyDetails<
  T extends keyof PropertyDetailsMap,
>({
  detailsAction,
  onSuccess,
  refresh,
}: {
  detailsAction: T;
  onSuccess?: () => void;
  refresh: () => void;
}) {
  const { mutateAsync, isPending } = useCreatePropertyDetails();
  const {
    control,
    handleSubmit,
    formState: { isLoading },
  } = useForm({
    resolver: zodResolver(PropertyDetailsSchema),
    defaultValues: {
      name: "",
      icon: "",
    },
  });

  async function handleCreatePropertyDetails(data: PropertyDetailsType) {
    try {
      const res = await mutateAsync({
        detailsAction,
        payload: data,
      });
      if (res.success) {
        toast.success(res.message);
        await refresh?.();
        onSuccess?.();
      }
      if (!res.success) {
        toast.error(res.message);
        onSuccess?.();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit(handleCreatePropertyDetails)} className='p-4'>
      <Card className='px-4'>
        <CardHeader>
          <CardTitle>Create New {namePerfect(detailsAction)}</CardTitle>
          <CardDescription>
            Please enter the correct information for each field.
          </CardDescription>

          <CardAction>
            <ActionButton
              size={"sm"}
              variant={"brand"}
              type='submit'
              isLoading={isPending || isLoading}
              disabled={isPending || isLoading}
              loadingText='Creating...'
            >
              Create {namePerfect(detailsAction)}
            </ActionButton>
          </CardAction>
        </CardHeader>
        <CardContent className='space-y-4'>
          <FormRhfInput
            control={control}
            name='name'
            type='text'
            label={`${namePerfect(detailsAction)} Name`}
            placeholder={`${namePerfect(detailsAction)} name`}
          />
          <FormRhfInput
            control={control}
            name='icon'
            type='text'
            label={`${namePerfect(detailsAction)} Icon`}
            placeholder={`${namePerfect(detailsAction)} icon url`}
          />
        </CardContent>
      </Card>
    </form>
  );
}
