import Link from "next/link";
import Logo from "@/components/logo/logo";
import { Heading2, Muted } from "@/components/typography/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className='flex justify-center items-center px-4 min-h-[70vh]'>
      <Card className='shadow-xl w-full max-w-lg'>
        <CardContent className='flex flex-col items-center space-y-6 pt-10 text-center'>
          <Logo />

          <div className='space-y-2'>
            <p className='font-bold text-brand text-6xl'>404</p>

            <Heading2 className='pb-0 border-none'>Page Not Found</Heading2>

            <Muted className='mx-auto max-w-sm'>
              Sorry, the page you&apos;re looking for doesn&apos;t exist or may
              have been moved.
            </Muted>
          </div>
        </CardContent>

        <CardFooter className='flex sm:flex-row flex-col gap-3'>
          <Button asChild className='w-full'>
            <Link href='/'>
              <Home className='mr-2 size-4' />
              Back to Home
            </Link>
          </Button>

          <Button asChild variant='outline' className='w-full'>
            <Link href='/properties'>
              <Search className='mr-2 size-4' />
              Browse Properties
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
