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
import {
  PropertyDetailsSchema,
  PropertyDetailsType,
} from "@/schemas/property.schema";
import { PropertyDetailsMap } from "@/types/property";
import { namePerfect } from "@/utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function CreatePropertyDetails<
  T extends keyof PropertyDetailsMap,
>({ detailsAction }: { detailsAction: T }) {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(PropertyDetailsSchema),
    defaultValues: {
      name: "",
      icon: "",
    },
  });

  async function handleCreatePropertyDetails(data: PropertyDetailsType) {
    console.log(data);
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
              variant={"brand"}
              type='submit'
              isLoading={false}
              loadingText='Creating...'
            >
              Create {namePerfect(detailsAction)}
            </ActionButton>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className='flex md:flex-row flex-col gap-4'>
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
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
