import type { Metadata } from "next";
import Logo from "@/components/logo/logo";
import { Heading4 } from "@/components/typography/typography";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ForgetPasswordForm from "./forget-password-form";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your Rent Nest account password",
};

export default function ForgetPasswordPage() {
  return (
    <Card className='shadow-lg border-border/60 w-full max-w-md'>
      {/* Brand Header */}
      <div className='flex flex-col items-center gap-4 pt-6'>
        <Logo />

        <Heading4 className='text-brand'>Welcome Back to Rent Nest</Heading4>
      </div>

      {/* Content Header */}
      <CardHeader className='space-y-3'>
        <CardTitle className='text-xl'>Forgot your password?</CardTitle>

        <CardDescription>
          Enter the email address associated with your account. We will send you
          a secure link to reset your password.
        </CardDescription>
      </CardHeader>

      {/* Form */}
      <CardContent>
        <ForgetPasswordForm />
      </CardContent>
    </Card>
  );
}
