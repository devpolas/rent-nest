"use client";

import * as z from "zod";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { FormRhfInput } from "@/components/rhf-input/form-rhf-input";
import LoadingSpinner from "@/components/spinner/loading-spinner";

import { signup } from "@/lib/actions/auth.actions";
import { SignupSchema } from "@/schemas/auth.schema";
import { saveCallbackUrl } from "@/utils/helpers";

type SignupFormProps = {
  defaultRole?: "TENANT" | "LANDLORD";
};

type FormValues = z.infer<typeof SignupSchema>;

export default function SignupForm({
  defaultRole = "TENANT",
}: SignupFormProps) {
  const accountType = defaultRole === "LANDLORD" ? "Landlord" : "Tenant";

  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");

  const {
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(SignupSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: defaultRole,
    },
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const passwordMismatch =
    Boolean(confirmPassword) && password !== confirmPassword;

  async function handleSignup(data: FormValues) {
    try {
      const response = await signup(data);

      if (!response.success) {
        toast.error(response.message ?? "Unable to create account.");
        return;
      }

      saveCallbackUrl(callbackUrl ?? "/");

      toast.success(response.message ?? "Account created successfully 🎉");

      router.push(`/verify-account?email=${encodeURIComponent(data.email)}`);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignup)}>
      <div className='flex flex-col gap-5'>
        <FormRhfInput<FormValues>
          control={control}
          name='name'
          type='text'
          label='Full Name'
          placeholder='Enter your full name'
        />

        <FormRhfInput<FormValues>
          control={control}
          name='email'
          type='email'
          label='Email Address'
          placeholder='username@example.com'
        />

        <FormRhfInput<FormValues>
          control={control}
          name='password'
          type='password'
          label='Password'
          placeholder='Create a strong password'
        />

        <FormRhfInput<FormValues>
          control={control}
          name='confirmPassword'
          type='password'
          label='Confirm Password'
          placeholder='Confirm your password'
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
            <LoadingSpinner text={`Creating ${accountType} account...`} />
          ) : (
            `Create ${accountType} Account`
          )}
        </Button>
      </div>
    </form>
  );
}
