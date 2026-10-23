"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { FormRhfInput } from "@/components/rhf-input/form-rhf-input";
import { SigninSchema } from "@/schemas/auth.schema";
import { demoCredentials, type DemoRole } from "@/config/demo-credentials";

import {
  clearCallbackUrl,
  getCallbackUrl,
  namePerfect,
  saveCallbackUrl,
} from "@/utils/helpers";

import ActionButton from "@/components/button/action-button";
import useAuth from "@/hooks/auth/use-auth";
import { signin } from "@/lib/actions/account.actions";
import { Button } from "@/components/ui/button";

type FormValues = z.infer<typeof SigninSchema>;

const showDemoCredentials =
  process.env.NEXT_PUBLIC_ENABLE_DEMO_CREDENTIALS === "true";

export default function SigninForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refetchUser } = useAuth();

  const callbackUrl = searchParams.get("callbackUrl");

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function fillDemoCredentials(role: DemoRole) {
    const credentials = demoCredentials[role];

    setValue("email", credentials.email, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("password", credentials.password, {
      shouldValidate: true,
      shouldDirty: true,
    });

    toast.success(
      `${role.charAt(0).toUpperCase() + role.slice(1)} demo credentials filled`,
    );
  }

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

      const user = await refetchUser();

      if (!user) {
        toast.error("Login succeeded, but your session could not be loaded.");
        return;
      }

      toast.success(response.message ?? "Welcome back to Rent Nest 🎉");

      router.refresh();
      router.replace(redirectUrl);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <div className='space-y-5'>
      {showDemoCredentials && (
        <div className='space-y-3 p-4 border border-dashed rounded-lg'>
          <div className='space-y-1'>
            <p className='font-semibold text-sm'>Explore the demo</p>
            <p className='text-muted-foreground text-xs'>
              Select a role to autofill its login credentials.
            </p>
          </div>

          <div className='gap-2 grid grid-cols-3'>
            {(Object.keys(demoCredentials) as DemoRole[]).map((role) => (
              <Button
                key={role}
                type='button'
                disabled={isSubmitting}
                onClick={() => fillDemoCredentials(role)}
                variant={"brand"}
              >
                {namePerfect(role)}
              </Button>
            ))}
          </div>
        </div>
      )}

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
    </div>
  );
}
