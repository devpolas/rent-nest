import ContinueWithGoogle from "@/components/social-auth-buttons/continue-with-google";
import Logo from "@/components/logo/logo";
import { Heading4, Paragraph } from "@/components/typography/typography";
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
import SignupForm from "@/app/(auth)/signup/signup-form";

export const metadata: Metadata = {
  title: "Landlord Signup",
  description: "Create your Rent Nest landlord account",
};

export default function LandlordSignup() {
  return (
    <Card className='shadow-lg py-6 border-brand/10 w-full max-w-md'>
      <div className='flex flex-col items-center gap-2'>
        <Logo />

        <Heading4 className='text-brand'>Become a Rent Nest landlord</Heading4>
      </div>

      <CardHeader className='space-y-2'>
        <CardTitle className='text-xl'>Create landlord account</CardTitle>

        <CardDescription>
          Enter your details to start listing properties.
        </CardDescription>

        <p className='text-muted-foreground text-sm'>
          Looking for a home?{" "}
          <Link
            href='/signup'
            className='font-medium text-brand hover:underline'
          >
            Create tenant account
          </Link>
        </p>
      </CardHeader>

      <CardContent className='space-y-4 pt-2'>
        <SignupForm defaultRole='LANDLORD' />

        <p className='text-muted-foreground text-sm text-center'>
          Already have an account?{" "}
          <Link
            href='/signin'
            className='font-medium text-brand hover:underline'
          >
            Sign in
          </Link>
        </p>
      </CardContent>
      <FieldSeparator>Or continue with</FieldSeparator>
      <ContinueWithGoogle />
    </Card>
  );
}
