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
import { publicNavigation } from "@/config/client/navigation";

export default function MobileNavbar() {
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

      <SheetContent side='right' className='flex flex-col w-72'>
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>

        <nav className='flex flex-col gap-2 mt-8'>
          {publicNavigation.map((item) => (
            <SheetClose asChild key={item.href}>
              <Link
                href={item.href}
                className='hover:bg-brand/10 px-4 py-3 rounded-md font-medium text-muted-foreground hover:text-brand text-base transition-colors'
              >
                {item.title}
              </Link>
            </SheetClose>
          ))}
        </nav>

        <div className='mt-auto'>
          <SheetClose asChild>
            <Button
              asChild
              className='bg-brand hover:bg-brand/90 w-full text-brand-foreground'
            >
              <Link href='/signup'>Get Started</Link>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
