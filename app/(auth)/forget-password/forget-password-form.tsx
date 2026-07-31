"use client";

import ActionButton from "@/components/button/action-button";
import { FormRhfInput } from "@/components/rhf-input/form-rhf-input";
import { forgotPassword } from "@/lib/actions/auth.actions";
import { saveCallbackUrl } from "@/utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email address."),
});

type FormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");
  const email = searchParams.get("email");

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: email ?? "",
    },
  });

  async function handleForgotPassword(data: FormValues) {
    try {
      const result = await forgotPassword(data);

      if (!result.success) {
        toast.error(result.message ?? "Unable to send reset password email.");
        return;
      }
      saveCallbackUrl(callbackUrl ?? "/");
      toast.success(result.message ?? "Password reset link has been sent.");
      router.push("/signin");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit(handleForgotPassword)}>
      <div className='flex flex-col gap-5'>
        <FormRhfInput
          control={control}
          name='email'
          label='Email Address'
          type='email'
          placeholder='Enter your email'
        />

        <ActionButton
          isLoading={isSubmitting}
          loadingText='Sending reset link...'
          type='submit'
        >
          Send Reset Link
        </ActionButton>

        <p className='text-brand-muted text-sm text-center'>
          Remember your password?{" "}
          <Link
            href='/signin'
            className='font-medium text-brand hover:underline underline-offset-4 transition-colors'
          >
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
}
