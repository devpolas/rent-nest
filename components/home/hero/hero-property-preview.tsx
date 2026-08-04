import { Home, ShieldCheck, Star, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { Caption, Large, Muted } from "@/components/typography/typography";

import HeroCarousel from "./hero-carousel";
import HeroStatCard from "./hero-stat-card";

export default function HeroPropertyPreview() {
  return (
    <div className='relative mx-auto pb-24 w-full max-w-xl'>
      {/* Carousel */}
      <HeroCarousel />

      {/* Verified badge */}
      <div className='top-4 left-4 sm:-left-5 absolute flex items-center gap-2 px-4 py-2 rounded-full glass'>
        <ShieldCheck className='size-5 text-brand-success' />

        <Muted className='text-white/90'>Verified Properties</Muted>
      </div>

      {/* Rating */}
      <Card className='right-3 sm:right-0 -bottom-5 absolute w-40 glass-card'>
        <CardContent className='p-4'>
          <div className='flex items-center gap-3'>
            <div className='flex justify-center items-center bg-brand/10 rounded-xl size-10'>
              <Star className='fill-current size-5 text-brand' />
            </div>

            <div>
              <Large className='text-white'>4.9</Large>

              <Caption className='text-white/70'>Rating</Caption>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className='-bottom-20 left-1/2 absolute gap-3 grid grid-cols-1 sm:grid-cols-2 w-[92%] -translate-x-1/2'>
        <HeroStatCard icon={Home} value='1500+' label='Properties' />

        <HeroStatCard icon={Users} value='500+' label='Landlords' />
      </div>
    </div>
  );
}
