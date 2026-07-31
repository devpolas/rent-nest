import ContinueWithGoogle from "@/components/social-auth-buttons/continue-with-google";
import Logo from "@/components/logo/logo";
import { Heading4, Paragraph } from "@/components/typography/typography";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FieldSeparator } from "@/components/ui/field";

import Link from "next/link";
import SignupForm from "./signup-form";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup",
  description: "Create your Rent Nest account",
};

export default function SignupPage() {
  return (
    <Card className='shadow-lg border-brand/10 w-full max-w-md'>
      {/* Brand Header */}
      <div className='flex flex-col items-center gap-3 pt-6'>
        <Logo />

        <Heading4 className='text-brand'>Welcome to Rent Nest</Heading4>

        <Paragraph className='max-w-xs text-muted-foreground text-sm text-center'>
          Find your perfect home and connect with trusted landlords.
        </Paragraph>
      </div>

      <CardHeader className='space-y-3'>
        <CardTitle className='text-2xl'>Create an account</CardTitle>

        <CardDescription>
          Enter your details to start your rental journey.
        </CardDescription>

        <p className='text-muted-foreground text-sm'>
          Already have an account?{" "}
          <Link
            href='/signin'
            className='font-medium text-brand hover:underline'
          >
            Sign in
          </Link>
        </p>
      </CardHeader>

      <CardContent>
        <SignupForm />
      </CardContent>

      <FieldSeparator className='*:data-[slot=field-separator-content]:bg-card text-muted-foreground'>
        Or continue with
      </FieldSeparator>

      <CardFooter className='pt-6'>
        <ContinueWithGoogle />
      </CardFooter>
    </Card>
  );
}
