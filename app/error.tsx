"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";

import Logo from "@/components/logo/logo";
import { Heading3, Muted } from "@/components/typography/typography";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("RentNest Error Boundary:", error);
  }, [error]);

  return (
    <div className='flex justify-center items-center px-4 min-h-[70vh]'>
      <Card className='shadow-xl w-full max-w-lg'>
        <CardHeader className='flex flex-col justify-center items-center space-y-5 text-center'>
          <Logo />

          <div className='flex justify-center items-center bg-destructive/10 rounded-full size-12'>
            <AlertTriangle className='size-6 text-destructive' />
          </div>

          <div className='space-y-2'>
            <Heading3>Something went wrong</Heading3>

            <Muted>
              We couldn&apos;t complete your request. Please try again.
            </Muted>
          </div>
        </CardHeader>

        <CardContent>
          {process.env.NODE_ENV === "development" && (
            <div className='bg-destructive/5 p-3 border border-destructive/30 rounded-md text-destructive text-sm text-center'>
              {error.message}
            </div>
          )}
        </CardContent>

        <CardFooter className='flex sm:flex-row flex-col gap-3'>
          <Button onClick={reset} className='w-full'>
            <RefreshCcw className='mr-2 size-4' />
            Try Again
          </Button>

          <Button asChild variant='outline' className='w-full'>
            <Link href='/'>
              <Home className='mr-2 size-4' />
              Return Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
