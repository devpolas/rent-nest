"use client";

import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import LoadingSpinner from "../spinner/loading-spinner";
import config from "@/config/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ContinueWithGoogle() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button asChild disabled={isLoading} variant='outline' className='w-full'>
      <Link
        href={`${config.base_url}/auth/google?callbackUrl=${encodeURIComponent(
          callbackUrl ?? "/",
        )}`}
        onClick={() => setIsLoading(true)}
      >
        <span className='flex flex-row gap-2'>
          <span>{isLoading ? <LoadingSpinner /> : <FcGoogle />}</span>
          <span>Continue with Google</span>
        </span>
      </Link>
    </Button>
  );
}
