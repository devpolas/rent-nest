import type { Metadata } from "next";
import { Suspense } from "react";

import Logo from "@/components/logo/logo";
import { Heading4 } from "@/components/typography/typography";
import LoadingSpinner from "@/components/spinner/loading-spinner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ResetPasswordForm from "./reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Create a new password for your Rent Nest account",
};

export default function ResetPasswordPage() {
  return (
    <Card className='shadow-lg py-6 border-border/60 w-full max-w-md'>
      {/* Brand Header */}
      <div className='flex flex-col items-center gap-4'>
        <Logo />

        <Heading4 className='text-brand'>Welcome Back to Rent Nest</Heading4>
      </div>

      {/* Content Header */}
      <CardHeader className='space-y-4'>
        <CardTitle className='text-xl'>Reset your password</CardTitle>

        <CardDescription>
          Enter your new password and confirm it below to securely reset your
          Rent Nest account password.
        </CardDescription>
      </CardHeader>

      {/* Form */}
      <CardContent>
        <Suspense
          fallback={<LoadingSpinner text='Reset password form loading...' />}
        >
          <ResetPasswordForm />
        </Suspense>
      </CardContent>
    </Card>
  );
}
