import Logo from "@/components/logo/logo";
import { Heading4 } from "@/components/typography/typography";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className='flex justify-center items-center px-4 min-h-[70vh]'>
      <Card className='bg-red-50/50 dark:bg-red-950/20 shadow-lg border-red-200 dark:border-red-900 w-full max-w-md'>
        <CardHeader className='flex flex-col items-center gap-4'>
          <Logo />

          <Heading4
            text='404 - Page Not Found'
            className='text-red-600 dark:text-red-400'
          />

          <p className='text-red-700 dark:text-red-300 text-sm text-center'>
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
        </CardHeader>

        <CardFooter className='flex flex-col gap-3'>
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
