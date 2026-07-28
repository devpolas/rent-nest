"use client";

import Logo from "@/components/logo/logo";
import { Heading4 } from "@/components/typography/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";
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
    console.error("Error Boundary:", error);
  }, [error]);

  return (
    <div className='flex justify-center items-center px-4 min-h-[70vh]'>
      <Card className='bg-red-50/50 dark:bg-red-950/20 shadow-lg border-red-200 dark:border-red-900 w-full max-w-md'>
        <CardHeader className='flex flex-col items-center gap-4'>
          <Logo />

          <Heading4
            text='Something went wrong'
            className='text-red-600 dark:text-red-400'
          />

          <p className='text-red-700 dark:text-red-300 text-sm'>
            We encountered an unexpected error. Please try again.
          </p>
        </CardHeader>

        <CardContent>
          {process.env.NODE_ENV === "development" && (
            <div className='bg-red-100 dark:bg-red-950 p-3 border border-red-200 dark:border-red-900 rounded-md text-red-800 dark:text-red-200 text-sm text-left'>
              {error.message}
            </div>
          )}
        </CardContent>

        <CardFooter className='flex flex-col gap-3'>
          <Button
            variant='destructive'
            onClick={() => reset()}
            className='w-full'
          >
            Try again
          </Button>

          <Link
            href='/'
            className='flex justify-center items-center hover:bg-red-100 dark:hover:bg-red-950 px-4 py-2 border border-red-300 dark:border-red-800 rounded-md w-full font-medium text-red-700 dark:text-red-300 text-sm transition'
          >
            Return Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
