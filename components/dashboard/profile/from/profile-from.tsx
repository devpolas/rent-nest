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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProfileInputType, ProfileSchema } from "@/schemas/user.schema";
import FormRhfTextarea from "@/components/rhf-input/form-rfh-textarea";
import { FormRhfDatePicker } from "@/components/rhf-input/form-rhf-date-picker";

interface ProfileUpdateFormProps {
  onSubmit: (data: ProfileInputType) => void | Promise<void>;
  defaultValues?: Partial<ProfileInputType>;
  isPending?: boolean;
}

export default function ProfileUpdateForm({
  onSubmit,
  defaultValues,
  isPending = false,
}: ProfileUpdateFormProps) {
  const { control, handleSubmit } = useForm<ProfileInputType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Update Profile</CardTitle>

          <CardDescription>Update your profile information.</CardDescription>

          <CardAction>
            <ActionButton
              type='submit'
              variant='brand'
              disabled={isPending}
              isLoading={isPending}
              loadingText='Updating...'
            >
              Update Profile
            </ActionButton>
          </CardAction>
        </CardHeader>

        <CardContent className='space-y-6'>
          <FormRhfTextarea
            name='bio'
            label='Bio'
            placeholder='Tell us a little about yourself...'
            control={control}
          />

          <FormRhfDatePicker
            name='birthdate'
            control={control}
            label='Birthdate'
            placeholder='Your birthdate'
          />
        </CardContent>
      </Card>
    </form>
  );
}
