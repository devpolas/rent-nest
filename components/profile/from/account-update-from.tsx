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

import { UserInputType, UserSchema } from "@/schemas/user.schema";
import { FormRhfInput } from "@/components/rhf-input/form-rhf-input";

interface AccountUpdateFormProps {
  onSubmit: (data: UserInputType) => void | Promise<void>;
  defaultValues?: Partial<UserInputType>;
  isPending?: boolean;
}

export default function AccountUpdateForm({
  onSubmit,
  defaultValues,
  isPending = false,
}: AccountUpdateFormProps) {
  const { control, handleSubmit } = useForm<UserInputType>({
    resolver: zodResolver(UserSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Update Account</CardTitle>

          <CardDescription>Update your account information.</CardDescription>

          <CardAction>
            <ActionButton
              type='submit'
              variant='brand'
              disabled={isPending}
              isLoading={isPending}
              loadingText='Updating...'
            >
              Update Account
            </ActionButton>
          </CardAction>
        </CardHeader>

        <CardContent className='space-y-6'>
          <FormRhfInput
            name='name'
            label='Name'
            placeholder='Enter your name'
            control={control}
          />

          <FormRhfInput
            name='phone'
            label='Phone'
            placeholder='Enter your phone number'
            control={control}
          />
        </CardContent>
      </Card>
    </form>
  );
}
