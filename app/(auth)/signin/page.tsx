import Link from "next/link";
import type { Metadata } from "next";

import Logo from "@/components/logo/logo";
import ContinueWithGoogle from "@/components/button/social-auth-buttons/continue-with-google";
import { Heading4 } from "@/components/typography/typography";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FieldSeparator } from "@/components/ui/field";

import SigninForm from "./signin-form";

export const metadata: Metadata = {
  title: "Signin",
  description: "Sign in to your Rent Nest account",
};

export default function SigninPage() {
  return (
    <Card className='shadow-lg py-6 border-border/60 w-full max-w-md'>
      {/* Brand Header */}
      <div className='flex flex-col items-center gap-4'>
        <Logo />

        <Heading4 className='text-brand'>Welcome Back to Rent Nest</Heading4>
      </div>

      {/* Auth Header */}
      <CardHeader className='space-y-2'>
        <CardTitle className='text-xl'>Sign in to your account</CardTitle>

        <CardDescription>
          Enter your email and password to continue your journey with Rent Nest.
        </CardDescription>

        <CardAction>
          <Link
            href='/signup'
            className='text-brand hover:text-brand-primary text-sm hover:underline transition-colors'
          >
            Create a new account
          </Link>
        </CardAction>
      </CardHeader>

      {/* Form */}
      <CardContent className='space-y-4'>
        <SigninForm />

        {/* Social Login */}
        <FieldSeparator className='*:data-[slot=field-separator-content]:bg-card'>
          Or continue with
        </FieldSeparator>

        <div className='pt-4'>
          <ContinueWithGoogle />
        </div>
      </CardContent>
    </Card>
  );
}
