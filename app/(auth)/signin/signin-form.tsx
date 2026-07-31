"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { signin } from "@/lib/actions/auth.actions";
import { useState } from "react";
import { Paragraph } from "@/components/typography/typography";
import { FormRhfInput } from "@/components/rhf-input/form-rhf-input";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/spinner/loading-spinner";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SigninSchema } from "@/schemas/auth.schema";
import {
  clearCallbackUrl,
  getCallbackUrl,
  saveCallbackUrl,
} from "@/utils/helpers";

type FormValues = z.infer<typeof SigninSchema>;

export default function SigninForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const router = useRouter();
  const [isError, setIsError] = useState<string>("");
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

  async function handleSignin(formData: FormValues) {
    setIsError("");
    try {
      const response = await signin(formData);
      if (response.success) {
        const redirect = callbackUrl ?? getCallbackUrl();
        clearCallbackUrl();
        toast.success(response.message ?? "Logged in successfully 🎉");
        router.replace(redirect);
        router.refresh();
        return;
      }
      if (response.message === "Please verify your email before login") {
        saveCallbackUrl(callbackUrl ?? "/");
        router.push(
          `/verify-account?email=${encodeURIComponent(formData.email)}`,
        );

        return;
      }

      toast.error(response.message);
      setIsError(response.message);
    } catch {
      toast.error("Something went wrong");
      setIsError("Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignin)}>
      <div className='flex flex-col gap-6'>
        {isError && (
          <Paragraph className={"text-center text-red-600"} text={isError} />
        )}
        <FormRhfInput<FormValues>
          name='email'
          type='email'
          label='Email'
          control={control}
          placeholder='username@example.com'
        />

        {/* Password with extra header */}
        <div className='space-y-2'>
          <div className='flex justify-between items-center'>
            <span className='font-medium text-sm'>Password</span>
            <Link
              href={`/forget-password?callbackUrl=${encodeURIComponent(callbackUrl ?? "/")}`}
              className='text-sm hover:underline underline-offset-4'
            >
              Forgot your password?
            </Link>
          </div>

          <FormRhfInput<FormValues>
            name='password'
            type='password'
            label='' // label already shown above
            control={control}
            placeholder='Enter your password'
          />
        </div>
      </div>

      <Button
        variant={"outline"}
        type='submit'
        className='mt-4 w-full'
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <LoadingSpinner text='logging in...' />
        ) : (
          <span>Login</span>
        )}
      </Button>
    </form>
  );
}
