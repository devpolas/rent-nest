"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/spinner/loading-spinner";

export default function ContinueWithGoogle() {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);

  const callbackUrl = useMemo(
    () => searchParams.get("callbackUrl") ?? "/",
    [searchParams],
  );

  const googleAuthUrl = `${process.env.NEXT_PUBLIC_LOCATION_API_BASE_URL!}/auth/google?callbackUrl=${encodeURIComponent(callbackUrl)}`;

  return (
    <Button
      asChild
      disabled={isLoading}
      variant='outline'
      className='group relative hover:bg-brand/5 border-border hover:border-brand/40 w-full hover:text-brand transition-colors'
    >
      <Link
        href={googleAuthUrl}
        onClick={() => setIsLoading(true)}
        aria-label='Continue with Google'
        className={isLoading ? "pointer-events-none" : ""}
      >
        <span className='flex justify-center items-center gap-3'>
          {isLoading ? <LoadingSpinner /> : <FcGoogle className='w-5 h-5' />}

          <span className='font-medium'>Continue with Google</span>
        </span>
      </Link>
    </Button>
  );
}
