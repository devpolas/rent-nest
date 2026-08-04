"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import TestimonialCard, { type Testimonial } from "./testimonial-card";

type Props = {
  testimonials: Testimonial[];
};

export default function TestimonialCarousel({ testimonials }: Props) {
  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      className='mx-auto px-2 max-w-6xl'
    >
      <CarouselContent className='py-2'>
        {testimonials.map((testimonial) => (
          <CarouselItem
            key={testimonial.id}
            className='md:basis-1/2 lg:basis-1/3'
          >
            <TestimonialCard testimonial={testimonial} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className='hidden md:inline-flex' />
      <CarouselNext className='hidden md:inline-flex' />
    </Carousel>
  );
}
