"use client";

import { Button } from "../../../components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { FormRhfInput } from "../../../components/rhf-input/form-rhf-input";
import LoadingSpinner from "../../../components/spinner/loading-spinner";
import { signup } from "@/lib/actions/auth.actions";
import { useRouter, useSearchParams } from "next/navigation";
import { SignupSchema } from "@/schemas/auth.schema";
import { FormRhfSelect } from "@/components/rhf-input/form-rfh-select";
import { saveCallbackUrl } from "@/utils/helpers";

const allowRoles = [
  { label: "Tenant", value: "TENANT" },
  { label: "Landlord", value: "LANDLORD" },
];

type FormValues = z.infer<typeof SignupSchema>;

export default function SignupForm() {
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
    },
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  async function handleSignup(formData: FormValues) {
    try {
      const response = await signup(formData);
      if (!response.success) {
        toast.error(response.message ?? "Something went wrong");
        return;
      }
      saveCallbackUrl(callbackUrl ?? "/");
      toast.success(response.message ?? "Account created successfully 🎉");
      router.push(
        `/verify-account?email=${encodeURIComponent(formData.email)}`,
      );
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignup)}>
      <div className='flex flex-col gap-6'>
        <FormRhfInput<FormValues>
          name='name'
          type='text'
          label='Full Name'
          control={control}
          placeholder='Enter your full name'
        />
        <FormRhfInput<FormValues>
          name='email'
          type='email'
          label='Email'
          control={control}
          placeholder='username@example.com'
        />
        <FormRhfInput<FormValues>
          name='password'
          type='password'
          label='Password'
          control={control}
          placeholder='Enter your password'
        />
        <FormRhfInput<FormValues>
          name='confirmPassword'
          type='password'
          label='Confirm Password'
          control={control}
          placeholder='Confirm your password'
        />

        <FormRhfSelect
          name='role'
          control={control}
          label='Select Role'
          options={allowRoles}
          placeholder='Select Role'
        />

        {/* Optional UX improvement */}
        {confirmPassword && password !== confirmPassword && (
          <p className='text-red-500 text-sm'>Passwords do not match</p>
        )}
      </div>

      <Button
        variant={"outline"}
        type='submit'
        className='mt-4 w-full'
        disabled={isSubmitting || password !== confirmPassword}
      >
        {isSubmitting ? (
          <LoadingSpinner text='Creating...' />
        ) : (
          <span>Create Account</span>
        )}
      </Button>
    </form>
  );
}
