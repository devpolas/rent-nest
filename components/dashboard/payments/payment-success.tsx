"use client";

import { CheckCircle2, CreditCard, Home, Loader2, User } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { usePaymentSession } from "@/hooks";

interface PaymentSuccessProps {
  sessionId: string;
}

export default function PaymentSuccess({ sessionId }: PaymentSuccessProps) {
  const { data, isLoading, isError, error } = usePaymentSession(sessionId);

  // ============================================================
  // LOADING
  // ============================================================

  if (isLoading) {
    return (
      <Card className='mx-auto w-full max-w-2xl'>
        <CardContent className='flex flex-col justify-center items-center gap-4 py-16 text-center'>
          <Loader2 className='size-10 text-brand animate-spin' />

          <div>
            <h2 className='font-semibold text-xl'>Verifying your payment</h2>

            <p className='mt-1 text-muted-foreground text-sm'>
              Please wait while we confirm your payment with Stripe.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (isError || !data) {
    return (
      <Card className='mx-auto w-full max-w-2xl'>
        <CardContent className='flex flex-col justify-center items-center gap-4 py-16 text-center'>
          <div className='flex justify-center items-center bg-destructive/10 rounded-full size-14'>
            <CreditCard className='size-7 text-destructive' />
          </div>

          <div>
            <h2 className='font-semibold text-xl'>
              Payment verification failed
            </h2>

            <p className='mt-1 text-muted-foreground text-sm'>
              We could not verify your payment. Please check your payment
              history or contact support.
            </p>

            {error instanceof Error && (
              <p className='mt-2 text-destructive text-xs'>{error.message}</p>
            )}
          </div>

          <div className='flex flex-wrap justify-center gap-2'>
            <Button asChild>
              <Link href='/dashboard/tenant/payments'>Payment History</Link>
            </Button>

            <Button variant='outline' asChild>
              <Link href='/dashboard/tenant'>Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // ============================================================
  // PAYMENT SUCCESS
  // ============================================================

  const payment = data.data?.session;

  return (
    <Card className='mx-auto w-full max-w-2xl overflow-hidden'>
      <CardHeader className='border-b text-center'>
        <div className='flex justify-center items-center bg-green-500/10 mx-auto mb-3 rounded-full size-16'>
          <CheckCircle2 className='size-9 text-green-600' />
        </div>

        <CardTitle className='text-2xl'>Payment Successful</CardTitle>

        <p className='text-muted-foreground text-sm'>
          Your rental payment has been completed successfully.
        </p>
      </CardHeader>

      <CardContent className='space-y-6 p-6'>
        {/* ======================================================
            PAYMENT SUMMARY
        ====================================================== */}

        <div className='bg-muted/30 p-4 border rounded-lg'>
          <div className='flex items-center gap-2 mb-4'>
            <CreditCard className='size-5 text-brand' />

            <h3 className='font-semibold'>Payment Details</h3>
          </div>

          <div className='gap-3 grid sm:grid-cols-2 text-sm'>
            <div>
              <p className='text-muted-foreground'>Amount</p>

              <p className='font-semibold'>
                {Number(payment?.amount).toFixed(2)}{" "}
                {payment?.currency.toUpperCase()}
              </p>
            </div>

            <div>
              <p className='text-muted-foreground'>Status</p>

              <p className='font-semibold text-green-600'>{payment?.status}</p>
            </div>

            <div className='sm:col-span-2'>
              <p className='text-muted-foreground'>Transaction ID</p>

              <p className='font-mono text-xs break-all'>
                {payment?.transactionId}
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================
            PROPERTY
        ====================================================== */}

        <div className='p-4 border rounded-lg'>
          <div className='flex items-center gap-2 mb-4'>
            <Home className='size-5 text-brand' />

            <h3 className='font-semibold'>Property</h3>
          </div>

          <div>
            <p className='font-medium'>{payment?.property.title}</p>

            <p className='mt-1 text-muted-foreground text-sm'>
              Monthly Rent: {Number(payment?.property.rent).toFixed(2)}{" "}
              {payment?.currency.toUpperCase()}
            </p>
          </div>
        </div>

        {/* ======================================================
            TENANT
        ====================================================== */}

        <div className='p-4 border rounded-lg'>
          <div className='flex items-center gap-2 mb-4'>
            <User className='size-5 text-brand' />

            <h3 className='font-semibold'>Tenant</h3>
          </div>

          <div className='text-sm'>
            <p className='font-medium'>{payment?.tenant.name}</p>

            <p className='text-muted-foreground'>{payment?.tenant.email}</p>
          </div>
        </div>

        {/* ======================================================
            ACTIONS
        ====================================================== */}

        <div className='flex sm:flex-row flex-col gap-2'>
          <Button className='flex-1' asChild>
            <Link href='/dashboard/tenant/payments'>View Payment History</Link>
          </Button>

          <Button variant='outline' className='flex-1' asChild>
            <Link href='/dashboard/tenant'>Go to Dashboard</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
