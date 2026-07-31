"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormRhfInput } from "@/components/rhf-input/form-rhf-input";
import LoadingSpinner from "@/components/spinner/loading-spinner";
import { Button } from "@/components/ui/button";

import { resetPassword } from "@/lib/actions/auth.actions";
import {
  ResetPasswordPayload,
  ResetPasswordSchema,
} from "@/schemas/auth.schema";
import { getCallbackUrl } from "@/utils/helpers";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<ResetPasswordPayload>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const passwordMismatch =
    Boolean(confirmPassword) && password !== confirmPassword;

  async function handleResetPassword(data: ResetPasswordPayload) {
    if (!token) {
      toast.error("Invalid or expired reset link.");
      router.replace("/forgot-password");
      return;
    }

    try {
      const result = await resetPassword({
        payload: data,
        token,
      });

      if (!result.success) {
        toast.error(
          result.message ?? "Unable to reset password. Please try again.",
        );
        return;
      }

      toast.success(result.message ?? "Password changed successfully.");

      const callbackUrl = getCallbackUrl();

      router.replace(`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  if (!token) {
    return (
      <div className='flex flex-col items-center gap-4 bg-brand-surface p-6 border rounded-lg text-center'>
        <p className='font-medium text-destructive'>
          Invalid or expired reset link.
        </p>

        <Link
          href='/forgot-password'
          className='font-medium text-brand text-sm hover:underline underline-offset-4'
        >
          Request a new password reset
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleResetPassword)}>
      <div className='flex flex-col gap-5'>
        <FormRhfInput<ResetPasswordPayload>
          control={control}
          name='password'
          type='password'
          label='New Password'
          placeholder='Enter your new password'
        />

        <FormRhfInput<ResetPasswordPayload>
          control={control}
          name='confirmPassword'
          type='password'
          label='Confirm Password'
          placeholder='Confirm your new password'
        />

        {passwordMismatch && (
          <p className='text-destructive text-sm'>Passwords do not match.</p>
        )}

        <Button
          type='submit'
          disabled={isSubmitting || passwordMismatch}
          className='bg-brand hover:bg-brand/90 w-full text-brand-foreground'
        >
          {isSubmitting ? (
            <LoadingSpinner text='Resetting password...' />
          ) : (
            "Reset Password"
          )}
        </Button>
      </div>
    </form>
  );
}
