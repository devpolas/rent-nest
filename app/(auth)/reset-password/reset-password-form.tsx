"use client";

import { FormRhfInput } from "@/components/rhf-input/form-rhf-input";
import LoadingSpinner from "@/components/spinner/loading-spinner";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/lib/actions/auth.actions";
import {
  ResetPasswordPayload,
  ResetPasswordSchema,
} from "@/schemas/auth.schema";
import { getCallbackUrl } from "@/utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ResetPasswordForm() {
  const router = useRouter();

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

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  async function handleResetPassword(data: ResetPasswordPayload) {
    if (!token) {
      toast.error("Invalid or expired reset link");
      router.replace("/signup");
      return;
    }
    try {
      const result = await resetPassword({ payload: data, token });
      if (!result.success) {
        toast.error(
          result.message ?? "Reset password failed. Please try again.",
        );
        return;
      }
      toast.success(
        result.message ?? "Your password has been changed successfully",
      );
      const redirect = getCallbackUrl();
      router.replace(`/signin?callbackUrl=${encodeURIComponent(redirect)}`);
    } catch {
      toast.error("Reset password failed. Please try again.");
    }
  }

  if (!token) {
    return (
      <div className='p-6 text-center'>
        <p className='text-red-500'>Invalid or expired reset link.</p>
        <a href='/forgot-password' className='text-blue-500 underline'>
          Request a new password reset
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleResetPassword)}>
      <div className='flex flex-col gap-6'>
        <FormRhfInput<ResetPasswordPayload>
          name='password'
          type='password'
          label='Password'
          control={control}
          placeholder='Enter your password'
        />

        <FormRhfInput<ResetPasswordPayload>
          name='confirmPassword'
          type='password'
          label='Confirm Password'
          control={control}
          placeholder='Confirm your password'
        />
        {/* Optional UX improvement */}
        {confirmPassword && password !== confirmPassword && (
          <p className='text-red-500 text-sm'>Passwords do not match</p>
        )}

        <div className='space-y-2'>
          <Button
            variant={"outline"}
            type='submit'
            className='mt-4 w-full'
            disabled={isSubmitting || password !== confirmPassword}
          >
            {isSubmitting ? (
              <LoadingSpinner text='Resetting...' />
            ) : (
              <span>Reset</span>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
