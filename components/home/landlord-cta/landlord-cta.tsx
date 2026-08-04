import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading2, Lead } from "@/components/typography/typography";

import LandlordBenefit from "./landlord-benefit";

const benefits = [
  "List unlimited properties for free",
  "Manage requests from one dashboard",
  "Reach thousands of verified tenants",
  "Get paid securely and on time",
];

export default function LandlordCta() {
  return (
    <section className='mx-auto px-4 py-20 container'>
      <Card className='items-center gap-0 grid lg:grid-cols-2 p-0 border-0 overflow-hidden glass-card'>
        {/* Content */}
        <div className='space-y-7 p-8 md:p-12'>
          <Badge className='bg-brand/10 text-brand'>For landlords</Badge>

          <Heading2 className='border-0'>
            Own a property? Start earning with Rent Nest.
          </Heading2>

          <Lead>
            List your property, connect with verified tenants and manage
            everything from a powerful, easy-to-use dashboard.
          </Lead>

          <ul className='gap-4 grid sm:grid-cols-2'>
            {benefits.map((benefit) => (
              <LandlordBenefit key={benefit} title={benefit} />
            ))}
          </ul>

          <div className='flex flex-wrap gap-4 pt-2'>
            <Button
              asChild
              size='lg'
              className='bg-brand hover:bg-brand/90 rounded-xl text-brand-foreground'
            >
              <Link href='/landlord/signup'>
                List Your Property
                <ArrowRight className='ml-2 size-5' />
              </Link>
            </Button>

            <Button asChild size='lg' variant='outline' className='rounded-xl'>
              <Link href='/about'>Learn More</Link>
            </Button>
          </div>
        </div>

        {/* Visual */}
        <div className='relative min-h-80 lg:min-h-[32rem] overflow-hidden'>
          <Image
            src='/images/properties/duplex-home.png'
            alt='Landlord property managed on Rent Nest'
            fill
            className='object-cover'
          />

          <div className='absolute inset-0 opacity-50 brand-gradient' />
        </div>
      </Card>
    </section>
  );
}
