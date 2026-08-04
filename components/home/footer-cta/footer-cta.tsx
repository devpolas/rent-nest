import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading2, Lead } from "@/components/typography/typography";

export default function FooterCta() {
  return (
    <section className='mx-auto px-4 pb-20 container'>
      <div className='relative bg-foreground p-10 md:p-16 rounded-3xl overflow-hidden text-center'>
        {/* Decorative gradient */}
        <div className='absolute inset-0 opacity-40 brand-gradient' />

        <div className='relative space-y-6 mx-auto max-w-2xl'>
          <Heading2 className='border-0 text-background'>
            Ready to find your next home?
          </Heading2>

          <Lead className='text-background/70'>
            Join thousands of renters and landlords using Rent Nest to move
            smarter. Get started in minutes.
          </Lead>

          <div className='flex flex-wrap justify-center gap-4 pt-2'>
            <Button
              asChild
              size='lg'
              className='bg-brand hover:bg-brand/90 rounded-xl text-brand-foreground'
            >
              <Link href='/properties'>
                Explore Properties
                <ArrowRight className='ml-2 size-5' />
              </Link>
            </Button>

            <Button
              asChild
              size='lg'
              variant='outline'
              className='bg-background/10 hover:bg-background/20 backdrop-blur-xl border-background/20 rounded-xl text-background'
            >
              <Link href='/signup'>Create an Account</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
