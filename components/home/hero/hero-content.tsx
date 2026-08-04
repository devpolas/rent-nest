import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading1, Large, Muted } from "@/components/typography/typography";

import HeroFeatureChip from "./hero-feature-chip";
import HeroSearch from "./hero-search";
import { heroFeatures } from "./hero-data";

export default function HeroContent() {
  return (
    <div className='space-y-8'>
      {/* Heading */}
      <div className='space-y-5'>
        <div className='inline-flex items-center px-4 py-2 rounded-full glass'>
          <span className='bg-brand-success mr-2 rounded-full size-2' />

          <Muted className='text-white/80'>Trusted rental marketplace</Muted>
        </div>

        <Heading1 className='max-w-3xl text-white'>
          Find Your Perfect{" "}
          <span className='bg-clip-text bg-gradient-to-r from-brand to-brand-success text-transparent'>
            Home
          </span>{" "}
          With Confidence
        </Heading1>

        <Large className='max-w-xl text-white/80'>
          Discover verified properties, connect with trusted landlords, and find
          a place that feels like home.
        </Large>
      </div>

      {/* Features */}
      <div className='flex flex-wrap gap-3'>
        {heroFeatures.map((feature) => (
          <HeroFeatureChip
            key={feature.id}
            icon={feature.icon}
            title={feature.title}
          />
        ))}
      </div>

      {/* Search */}
      <HeroSearch />

      {/* CTA */}
      <div className='flex flex-wrap gap-4'>
        <Button
          size='lg'
          variant='brand'
          className='px-6 rounded-2xl'
        >
          Explore Properties
          <ArrowRight className='ml-2 size-5' />
        </Button>

        <Button size='lg' variant='glass' className='rounded-2xl'>
          List Your Property
        </Button>
      </div>
    </div>
  );
}
