"use client";

import Link from "next/link";

import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

import { publicNavigation } from "@/config/client/navigation";

export default function MobileNavbar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='md:hidden'>
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side='right' className='w-72'>
        <div className='flex flex-col gap-6 mt-10'>
          {publicNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='font-medium text-lg'
            >
              {item.title}
            </Link>
          ))}

          <Button asChild className='bg-brand text-brand-foreground'>
            <Link href='/signup'>Get Started</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
