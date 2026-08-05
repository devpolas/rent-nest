import ContinueWithGoogle from "@/components/button/social-auth-buttons/continue-with-google";
import Logo from "@/components/logo/logo";
import { Heading4 } from "@/components/typography/typography";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FieldSeparator } from "@/components/ui/field";

import Link from "next/link";

import type { Metadata } from "next";
import SignupForm from "./signup-form";

export const metadata: Metadata = {
  title: "Signup",
  description: "Create your Rent Nest account",
};

export default function SignupPage() {
  return (
    <Card className='shadow-lg py-6 border-brand/10 w-full max-w-md'>
      <div className='flex flex-col items-center gap-2'>
        <Logo />

        <Heading4 className='text-brand'>
          Create your Rent Nest account
        </Heading4>
      </div>

      <CardHeader className='space-y-2'>
        <CardTitle className='text-xl'>Create an account</CardTitle>

        <CardDescription>
          Enter your details to start your rental journey.
        </CardDescription>

        <p className='text-muted-foreground text-sm'>
          Want to rent out your property?{" "}
          <Link
            href='/landlord/signup'
            className='font-medium text-brand hover:underline'
          >
            Create landlord account
          </Link>
        </p>
      </CardHeader>

      <CardContent className='space-y-4 pt-2'>
        <SignupForm />

        <p className='text-muted-foreground text-sm text-center'>
          Already have an account?{" "}
          <Link
            href='/signin'
            className='font-medium text-brand hover:underline'
          >
            Sign in
          </Link>
        </p>

        <FieldSeparator>Or continue with</FieldSeparator>

        <div className='pt-4'>
          <ContinueWithGoogle />
        </div>
      </CardContent>
    </Card>
  );
}
