"use client";

import { Suspense, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import Logo from "@/components/logo/logo";
import LoadingSpinner from "@/components/spinner/loading-spinner";
import { Heading4 } from "@/components/typography/typography";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { sendVerificationEmail, verifyEmail } from "@/lib/actions/auth.actions";

import { clearCallbackUrl, getCallbackUrl } from "@/utils/helpers";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [isPending, startTransition] = useTransition();

  function redirectToSignin() {
    const callbackUrl = getCallbackUrl();

    router.push(`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  function handleResendVerification() {
    if (!email) {
      toast.error("No email address found.");
      return;
    }

    startTransition(async () => {
      try {
        const result = await sendVerificationEmail({
          email,
        });

        if (!result.success) {
          toast.error(result.message ?? "Failed to send verification email");
          return;
        }

        toast.success(result.message ?? "Verification email sent successfully");

        redirectToSignin();
      } catch {
        toast.error("Something went wrong. Please try again.");
      }
    });
  }

  function handleVerify() {
    if (!email || !token) {
      toast.error("Verification information is missing.");
      return;
    }

    startTransition(async () => {
      try {
        const result = await verifyEmail({
          email,
          token,
        });

        if (!result.success) {
          toast.error(result.message ?? "Verification failed");
          return;
        }

        toast.success(result.message ?? "Account verified successfully");

        clearCallbackUrl();

        redirectToSignin();
      } catch {
        toast.error("Something went wrong. Please try again.");
      }
    });
  }

  if (!email) {
    return (
      <Card className='shadow-lg border-border/60 w-full max-w-md'>
        <CardHeader>
          <CardTitle>Invalid Verification Request</CardTitle>

          <CardDescription>
            No email address was provided for account verification.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const isVerificationRequest = Boolean(email && token);

  return (
    <Card className='shadow-lg border-border/60 w-full max-w-md'>
      {/* Brand */}
      <div className='flex flex-col items-center gap-4 pt-6'>
        <Logo />

        <Heading4 className='text-brand'>Welcome Back to Rent Nest</Heading4>
      </div>

      <CardHeader className='space-y-3'>
        <CardTitle className='text-xl'>Verify Your Account</CardTitle>

        <CardDescription>
          {isVerificationRequest ? (
            <>
              Confirm your email address{" "}
              <strong className='text-foreground'>{email}</strong> to activate
              your Rent Nest account.
            </>
          ) : (
            <>
              We sent a verification email to{" "}
              <strong className='text-foreground'>{email}</strong>. Please check
              your inbox or spam folder.
            </>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Button
          variant='default'
          className='bg-brand hover:bg-brand-primary w-full'
          disabled={isPending}
          onClick={
            isVerificationRequest ? handleVerify : handleResendVerification
          }
        >
          {isPending ? (
            <LoadingSpinner
              text={
                isVerificationRequest
                  ? "Verifying account..."
                  : "Sending email..."
              }
            />
          ) : isVerificationRequest ? (
            "Verify Account"
          ) : (
            "Resend Verification Email"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

export default function VerifyEmail() {
  return (
    <Suspense fallback={<LoadingSpinner text='Loading verification...' />}>
      <VerifyEmailContent />
    </Suspense>
  );
}
