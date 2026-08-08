import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heading2, Lead } from "@/components/typography/typography";

export default function FeaturedProperties() {
  return (
    <section className='mx-auto px-4 py-20 container'>
      <div className='flex md:flex-row flex-col md:justify-between md:items-end gap-6 mb-12'>
        <div className='max-w-2xl'>
          <Badge className='bg-brand/10 mb-4 text-brand'>Handpicked</Badge>

          <Heading2 className='border-0'>Featured Properties</Heading2>

          <Lead className='mt-3'>
            Explore our most popular verified rentals, chosen for quality,
            location and value.
          </Lead>
        </div>

        <Button asChild variant='outline' className='rounded-xl'>
          <Link href='/properties'>
            View All Properties
            <ArrowRight className='ml-2 size-4' />
          </Link>
        </Button>
      </div>

      <div className='gap-6 grid md:grid-cols-2 lg:grid-cols-3'></div>
    </section>
  );
}
