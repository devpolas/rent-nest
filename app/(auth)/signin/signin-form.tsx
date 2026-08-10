"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormRhfInput } from "@/components/rhf-input/form-rhf-input";
import { SigninSchema } from "@/schemas/auth.schema";

import {
  clearCallbackUrl,
  getCallbackUrl,
  saveCallbackUrl,
} from "@/utils/helpers";

import * as z from "zod";
import ActionButton from "@/components/button/action-button";
import useAuth from "@/hooks/auth/use-auth";
import { signin } from "@/lib/actions/account.actions";

type FormValues = z.infer<typeof SigninSchema>;

export default function SigninForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refetchUser } = useAuth();

  const callbackUrl = searchParams.get("callbackUrl");

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSignIn(data: FormValues) {
    try {
      const response = await signin(data);
      if (!response.success) {
        if (response.message === "Please verify your email before login") {
          saveCallbackUrl(callbackUrl ?? "/");
          router.push(
            `/verify-account?email=${encodeURIComponent(data.email)}`,
          );
          return;
        }
        toast.error(response.message ?? "Invalid email or password.");
        return;
      }

      const redirectUrl = callbackUrl ?? getCallbackUrl();

      clearCallbackUrl();

      /**
       * signin() should have set the auth cookies.
       *
       * Now force React Query to fetch /me again.
       */
      const user = await refetchUser();
      if (!user) {
        toast.error("Login succeeded, but your session could not be loaded.");
        return;
      }
      toast.success(response.message ?? "Welcome back to Rent Nest 🎉");
      /**
       * Refresh Server Components so they see
       * the new authentication cookies.
       */
      router.refresh();
      router.replace(redirectUrl);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
      <div className='flex flex-col gap-5'>
        <FormRhfInput<FormValues>
          control={control}
          name='email'
          type='email'
          label='Email Address'
          placeholder='username@example.com'
        />

        <div className='space-y-2'>
          <div className='flex justify-between items-center'>
            <span className='font-medium text-sm'>Password</span>

            <Link
              href={`/forget-password?callbackUrl=${encodeURIComponent(
                callbackUrl ?? "/",
              )}`}
              className='font-medium text-brand text-sm hover:underline underline-offset-4'
            >
              Forgot password?
            </Link>
          </div>

          <FormRhfInput<FormValues>
            control={control}
            name='password'
            type='password'
            label=''
            placeholder='Enter your password'
          />
        </div>

        <ActionButton
          type='submit'
          isLoading={isSubmitting}
          loadingText='Signing in...'
          className='mt-2'
        >
          Sign In
        </ActionButton>
      </div>
    </form>
  );
}
