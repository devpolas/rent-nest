"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useTransition } from "react"; // Added useTransition
import { toast } from "sonner";
import LoadingSpinner from "@/components/spinner/loading-spinner";
import { Heading4 } from "@/components/typography/typography";
import Logo from "@/components/logo/logo";
import { sendVerificationEmail, verifyEmail } from "@/lib/actions/auth.actions";
import { clearCallbackUrl, getCallbackUrl } from "@/utils/helpers";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  // useTransition is often better for Server Actions than manual loading states
  const [isPending, startTransition] = useTransition();

  async function handleResendVerification() {
    if (!email) {
      toast.error("No email address found.");
      return;
    }

    startTransition(async () => {
      try {
        const result = await sendVerificationEmail({ email });

        if (result.success) {
          toast.success(result.message ?? "Verification link sent!");

          const callbackUrl = getCallbackUrl();

          router.push(`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
        } else {
          toast.error(result.message ?? "Failed to send email");
        }
      } catch {
        toast.error("An unexpected error occurred");
      }
    });
  }

  async function verifyNow() {
    if (!email || !token) {
      toast.error("No email address or token found.");
      return;
    }

    const data = { email, token };

    startTransition(async () => {
      try {
        const result = await verifyEmail(data);
        if (result.success) {
          toast.success(result.message ?? "Successfully verified!");
          const callbackUrl = getCallbackUrl();
          clearCallbackUrl();
          router.push(`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
        } else {
          toast.error(result.message ?? "Verification failed");
        }
      } catch {
        toast.error("An unexpected error occurred");
      }
    });
  }

  if (!email) {
    return (
      <Card className='mx-auto mt-10 w-full max-w-sm'>
        <CardHeader>
          <CardTitle>Invalid Request</CardTitle>
          <CardDescription>No email provided for verification.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className='mx-auto mt-10 w-full max-w-sm'>
      <CardHeader className='space-y-2'>
        <div className='flex flex-col justify-center items-center gap-4'>
          <Logo />
          <Heading4 text='Welcome Back to NextShop' />
        </div>
        <CardTitle>Verify Your Account</CardTitle>
        <CardDescription>
          {email && token ? (
            <>
              Confirm your email address <strong>{email}</strong> by clicking
              the button below. Once verified, your account will be activated
              and you&apos;ll be able to sign in.
            </>
          ) : (
            <>
              We&apos;ve sent a verification email to <strong>{email}</strong>.
              Please check your inbox and click the verification link to
              activate your account. If you can&apos;t find the email, check
              your spam folder or resend the verification email below.
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant={"outline"}
          onClick={email && token ? verifyNow : handleResendVerification}
          disabled={isPending}
          className='w-full'
        >
          {isPending ? (
            <LoadingSpinner
              text={email && token ? "Verifying..." : "Sending..."}
            />
          ) : email && token ? (
            "Verify Now"
          ) : (
            "Resend Verification Email"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

// Ensure the Suspense boundary is wrapping the component using useSearchParams
export default function VerifyEmail() {
  return (
    <Suspense fallback={<LoadingSpinner text='loading...' />}>
      <VerifyEmailContent />
    </Suspense>
  );
}
