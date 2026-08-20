"use client";

import Link from "next/link";
import { ArrowRight, RefreshCw } from "lucide-react";

import PropertyCard from "@/components/property/property-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heading2, Lead } from "@/components/typography/typography";
import { useProperties } from "@/hooks";

import FeaturedPropertySkeleton from "./featured-property-skeleton";

export default function FeaturedProperties() {
  const { data, isLoading, isFetching, isError, refetch } = useProperties({
    status: "APPROVED",
    availability: "AVAILABLE",
    limit: "4",
  });

  /**
   * Initial loading
   */
  if (isLoading && !data) {
    return (
      <section
        className='bg-muted/30 py-20 sm:py-24'
        aria-busy='true'
        aria-label='Loading featured properties'
      >
        <div className='mx-auto px-4 container'>
          <FeaturedPropertyHeader />

          <div className='mt-10'>
            <FeaturedPropertySkeleton />
          </div>
        </div>
      </section>
    );
  }

  /**
   * Error state
   */
  if (isError || !data?.success || !data.data) {
    return (
      <section className='bg-muted/30 py-20 sm:py-24'>
        <div className='mx-auto px-4 container'>
          <FeaturedPropertyHeader />

          <Card className='mx-auto mt-10 border-dashed max-w-2xl'>
            <CardContent className='flex flex-col justify-center items-center px-6 py-14 text-center'>
              <div className='flex justify-center items-center bg-destructive/10 mb-5 rounded-full size-12'>
                <RefreshCw className='size-5 text-destructive' />
              </div>

              <h3 className='font-semibold text-lg'>
                Unable to load featured properties
              </h3>

              <p className='mt-2 max-w-md text-muted-foreground text-sm leading-6'>
                {data?.message ??
                  "Something went wrong while loading properties. Please try again."}
              </p>

              <Button
                type='button'
                variant='outline'
                className='mt-6 rounded-xl'
                onClick={() => refetch()}
              >
                <RefreshCw className='mr-2 size-4' />
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  const properties = data.data.properties ?? [];

  /**
   * Empty state
   */
  if (properties.length === 0) {
    return (
      <section className='bg-muted/30 py-20 sm:py-24'>
        <div className='mx-auto px-4 container'>
          <FeaturedPropertyHeader />

          <div className='flex justify-center items-center min-h-[320px]'>
            <div className='max-w-md text-center'>
              <div className='flex justify-center items-center bg-background shadow-sm mx-auto mb-5 border rounded-full size-14'>
                <span className='text-2xl'>🏠</span>
              </div>

              <h3 className='font-semibold text-lg'>
                No featured properties yet
              </h3>

              <p className='mt-2 text-muted-foreground text-sm leading-6'>
                We&apos;re constantly adding new verified rentals. Explore all
                available properties to find your next home.
              </p>

              <Button asChild className='mt-6 rounded-xl'>
                <Link href='/properties'>
                  Explore Properties
                  <ArrowRight className='ml-2 size-4' />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className='bg-muted/30 py-20 sm:py-24'
      aria-labelledby='featured-properties-heading'
    >
      <div className='mx-auto px-4 container'>
        <FeaturedPropertyHeader />

        <div className='relative mt-10'>
          {/* Background refetch indicator */}
          {isFetching && (
            <div
              className='top-0 right-0 z-10 absolute flex items-center gap-2 bg-background/95 shadow-sm backdrop-blur-sm px-3 py-1.5 border rounded-full text-muted-foreground text-xs'
              role='status'
              aria-live='polite'
            >
              <span className='bg-brand rounded-full size-1.5 animate-pulse' />
              Updating
            </div>
          )}

          {/* Property grid */}
          <div
            className={[
              "gap-5 sm:gap-6 grid",
              "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
              "transition-opacity duration-300",
              isFetching ? "opacity-70" : "opacity-100",
            ].join(" ")}
          >
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>

        {/* Mobile / bottom CTA */}
        <div className='flex justify-center mt-10'>
          <Button
            asChild
            variant='outline'
            size='lg'
            className='px-6 rounded-xl'
          >
            <Link href='/properties'>
              View All Properties
              <ArrowRight className='ml-2 size-4' />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/**
 * Shared section header
 */
function FeaturedPropertyHeader() {
  return (
    <div className='flex md:flex-row flex-col md:justify-between md:items-end gap-6'>
      <div className='max-w-2xl'>
        <Badge
          variant='secondary'
          className='bg-brand/10 mb-4 px-3 py-1 border-0 font-medium text-brand'
        >
          Handpicked for you
        </Badge>

        <Heading2 className='border-0 font-bold tracking-tight'>
          Featured Properties
        </Heading2>

        <Lead className='mt-3 max-w-xl text-muted-foreground leading-7'>
          Discover verified rentals selected for their quality, location, and
          exceptional value.
        </Lead>
      </div>

      <Button
        asChild
        variant='outline'
        className='hidden md:flex rounded-xl shrink-0'
      >
        <Link href='/properties'>
          View All Properties
          <ArrowRight className='ml-2 size-4' />
        </Link>
      </Button>
    </div>
  );
}
