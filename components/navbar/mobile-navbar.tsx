"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import Logo from "@/components/logo/logo";
import { publicNavigation } from "@/config/navigation";
import LoadingSpinner from "../spinner/loading-spinner";
import useAuth from "@/hooks/auth/use-auth";

export default function MobileNavbar() {
  const { isLoading, isAuthenticated } = useAuth();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='md:hidden hover:bg-brand/10'
        >
          <Menu className='size-5' />
          <span className='sr-only'>Open navigation menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side='right'
        className='flex flex-col gap-6 bg-brand/5 supports-[backdrop-filter]:bg-background/70 backdrop-blur-xl backdrop-saturate-150 border-brand/15 w-72'
      >
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>

        <nav className='flex flex-col gap-2'>
          {publicNavigation.map((item) => (
            <SheetClose asChild key={item.href}>
              <Link
                href={item.href}
                className='hover:bg-brand/10 px-4 py-1 rounded-md font-medium text-muted-foreground hover:text-brand text-base transition-colors'
              >
                {item.title}
              </Link>
            </SheetClose>
          ))}
        </nav>

        <div className='mt-auto'>
          <SheetClose asChild>
            <Button asChild variant='brand' className='w-full'>
              {isLoading ? (
                <LoadingSpinner />
              ) : isAuthenticated ? (
                <Link href='/dashboard'>Go to Dashboard</Link>
              ) : (
                <Link href='/signup'>Get Started</Link>
              )}
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
